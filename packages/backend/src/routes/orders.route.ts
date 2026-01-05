import { eq } from 'drizzle-orm'
import { Router } from 'express'
import db from '@/db/index'
import { orderItems, orders, products } from '@/db/schema'
import { catchErrors } from '@/lib/async'
import { AppError } from '@/lib/errors'
import auth from '@/middleware/auth'

const router = Router()

const generateOrderNumber = () => Math.floor(1000000000 + Math.random() * 9000000000).toString()

router.get(
    '/me/orders',
    auth,
    catchErrors(async (req, res) => {
        const userId = (req.user as { userId: number }).userId
        const userOrders = await db.query.orders.findMany({
            where: eq(orders.userId, userId),
            with: {
                items: {
                    with: {
                        product: true
                    }
                }
            },
            orderBy: (ordersTable, { desc }) => [desc(ordersTable.createdAt)]
        })

        const formattedOrders = userOrders.map(order => ({
            id: order.orderNumber,
            date: new Date(order.createdAt).toLocaleDateString('en-GB'),
            total: order.total,
            status: order.status,
            itemsCount: order.items.reduce((acc, item) => acc + item.quantity, 0),
            items: order.items.map(item => ({
                name: item.product.title,
                quantity: item.quantity,
                price: item.price
            }))
        }))

        return res.status(200).json(formattedOrders)
    })
)

router.get(
    '/orders/:orderNumber',
    catchErrors(async (req, res) => {
        const { orderNumber } = req.params
        const order = await db.query.orders.findFirst({
            where: eq(orders.orderNumber, orderNumber),
            with: {
                user: true,
                items: {
                    with: {
                        product: true
                    }
                }
            }
        })

        if (!order) throw new AppError('Order not found', 404)

        return res.status(200).json({
            id: order.orderNumber,
            date: new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            status: order.status,
            total: order.total,
            user: {
                fullName: order.user.fullName,
                address: order.user.address,
                address2: order.user.address2,
                city: order.user.city,
                zipCode: order.user.zipCode,
                country: order.user.country,
                email: order.user.email,
                phone: order.user.phone
            },
            items: order.items.map(item => ({
                description: item.product.title,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            }))
        })
    })
)

router.post(
    '/orders',
    auth,
    catchErrors(async (req, res) => {
        const userId = (req.user as { userId: number }).userId
        const { items } = req.body as { items: { productId: number; quantity: number; price: number }[] }

        if (!items?.length) throw new AppError('Items are required', 400)

        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        const orderNumber = generateOrderNumber()

        const newOrder = await db.transaction(async tx => {
            for (const item of items) {
                const [product] = await tx.select().from(products).where(eq(products.id, item.productId)).limit(1)

                if (!product) throw new AppError(`Product with ID ${item.productId} not found`, 404)
                if (product.stock < item.quantity)
                    throw new AppError(`Insufficient stock for product: ${product.title}`, 400)

                await tx
                    .update(products)
                    .set({ stock: product.stock - item.quantity })
                    .where(eq(products.id, item.productId))
            }

            const [insertedOrder] = await tx
                .insert(orders)
                .values({ userId, orderNumber, total, status: 'processing' })
                .returning()

            await tx.insert(orderItems).values(
                items.map(item => ({
                    orderId: insertedOrder.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }))
            )

            return insertedOrder
        })

        return res.status(201).json(newOrder)
    })
)

export default router
