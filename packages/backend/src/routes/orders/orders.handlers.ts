import { eq, inArray } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { z } from 'zod'
import db from '@/db'
import { orderItems, orderSchema, orders, products } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import type { CreateRoute, GetOneRoute, ListRoute } from './orders.route'

export const list: AppRouteHandler<ListRoute> = async c => {
    const payload = c.get('jwtPayload')
    const userId = payload.id

    const userOrders = await db.query.orders.findMany({
        where: eq(orders.userId, userId),
        with: {
            items: true
        },
        orderBy: (orders, { desc }) => [desc(orders.createdAt)]
    })

    const formattedOrders = userOrders.map(order => ({
        ...order,
        shop: '342 HIFI Horizon - Falkirk' as const,
        currency: 'DKK' as const
    }))

    return c.json(z.array(orderSchema).parse(formattedOrders), HttpStatusCodes.OK)
}

export const getOne: AppRouteHandler<GetOneRoute> = async c => {
    const payload = c.get('jwtPayload')
    const userId = payload.id
    const { id } = c.req.valid('param')

    const order = await db.query.orders.findFirst({
        where: (orders, { eq, and }) => and(eq(orders.id, id), eq(orders.userId, userId)),
        with: {
            items: true
        }
    })

    if (!order) {
        return c.json({ message: 'Order not found' }, HttpStatusCodes.NOT_FOUND)
    }

    const formattedOrder = {
        ...order,
        shop: '342 HIFI Horizon - Falkirk' as const,
        currency: 'DKK' as const
    }

    return c.json(orderSchema.parse(formattedOrder), HttpStatusCodes.OK)
}

export const create: AppRouteHandler<CreateRoute> = async c => {
    const payload = c.get('jwtPayload')
    const userId = payload.id
    const { items, deliveryMethod, customerDetails } = c.req.valid('json')

    // 1. Fetch products to get current prices and names
    const productIds = items.map(i => i.productId)
    const dbProducts = await db.query.products.findMany({
        where: inArray(products.id, productIds)
    })

    if (dbProducts.length !== productIds.length) {
        return c.json({ message: 'Some products not found' }, HttpStatusCodes.BAD_REQUEST)
    }

    // 2. Calculate Totals
    let subtotal = 0
    const orderItemsData = []

    for (const item of items) {
        const product = dbProducts.find(p => p.id === item.productId)
        if (!product) continue // Should not happen due to check above

        subtotal += product.price * item.quantity

        orderItemsData.push({
            productId: product.id,
            productName: product.name,
            productBrand: product.brand,
            price: product.price,
            quantity: item.quantity
        })
    }

    const vat = Math.round(subtotal * 0.25) // 25% VAT
    const delivery = deliveryMethod === 'express' ? 10000 : 5000 // 100 DKK vs 50 DKK (in cents/øre)
    const total = subtotal + vat + delivery

    // 3. Create Order Number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // 4. Save Order
    const [newOrder] = await db
        .insert(orders)
        .values({
            orderNumber,
            userId,
            total,
            subtotal,
            vat,
            delivery,
            status: 'pending',
            // Snapshot Customer Details
            customerName: customerDetails.fullName,
            customerEmail: customerDetails.email,
            customerPhone: customerDetails.phone,
            customerAddress: customerDetails.address,
            customerAddress2: customerDetails.address2,
            customerZip: customerDetails.zipCode,
            customerCity: customerDetails.city,
            customerCountry: customerDetails.country
        })
        .returning()

    // 5. Save Order Items
    await db.insert(orderItems).values(
        orderItemsData.map(item => ({
            orderId: newOrder.id,
            ...item
        }))
    )

    // 6. Return Result
    const fullOrder = await db.query.orders.findFirst({
        where: eq(orders.id, newOrder.id),
        with: {
            items: true
        }
    })

    if (!fullOrder) {
        return c.json({ message: 'Error creating order' }, HttpStatusCodes.INTERNAL_SERVER_ERROR)
    }

    const formattedOrder = {
        ...fullOrder,
        shop: '342 HIFI Horizon - Falkirk' as const,
        currency: 'DKK' as const
    }

    return c.json(orderSchema.parse(formattedOrder), HttpStatusCodes.CREATED)
}
