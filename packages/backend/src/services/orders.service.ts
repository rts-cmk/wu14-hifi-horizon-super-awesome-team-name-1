import { eq } from 'drizzle-orm'
import db from '@/db'
import { orderItems, orders, products } from '@/db/schema'

export class OrdersService {
    async getOrdersByUserId(userId: number) {
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
        return userOrders
    }

    async getOrderByOrderNumber(orderNumber: string) {
        return await db.query.orders.findFirst({
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
    }

    async createOrder(userId: number, items: { productId: number; quantity: number; price: number }[]) {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        const orderNumber = this.generateOrderNumber()

        return await db.transaction(async tx => {
            for (const item of items) {
                const [product] = await tx.select().from(products).where(eq(products.id, item.productId)).limit(1)

                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`)
                }

                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product: ${product.title}`)
                }

                await tx
                    .update(products)
                    .set({ stock: product.stock - item.quantity })
                    .where(eq(products.id, item.productId))
            }

            const [newOrder] = await tx
                .insert(orders)
                .values({
                    userId,
                    orderNumber,
                    total,
                    status: 'processing'
                })
                .returning()

            if (items.length > 0) {
                await tx.insert(orderItems).values(
                    items.map(item => ({
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                )
            }

            return newOrder
        })
    }

    private generateOrderNumber() {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString()
    }
}

export const ordersService = new OrdersService()
