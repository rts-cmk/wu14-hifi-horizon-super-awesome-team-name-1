import type { Request, Response } from 'express'
import type { orderItems, orders, products, users } from '@/db/schema'
import { ordersService } from '@/services/orders.service'

type DBOrderWithItems = typeof orders.$inferSelect & {
    items: (typeof orderItems.$inferSelect & {
        product: typeof products.$inferSelect
    })[]
}

type DBOrderWithUserAndItems = DBOrderWithItems & {
    user: typeof users.$inferSelect
}

export class OrdersController {
    async getMeOrders(req: Request, res: Response) {
        try {
            const userId = (req.user as { userId: number }).userId
            const ordersData = await ordersService.getOrdersByUserId(userId)

            const formattedOrders = (ordersData as DBOrderWithItems[]).map(order => ({
                id: order.orderNumber,
                date: new Date(order.createdAt).toLocaleDateString('en-GB'),
                total: order.total,
                status: order.status,
                itemsCount: order.items.reduce((acc: number, item) => acc + item.quantity, 0),
                items: order.items.map(item => ({
                    name: item.product.title,
                    quantity: item.quantity,
                    price: item.price
                }))
            }))

            return res.status(200).json(formattedOrders)
        } catch (error) {
            console.error('Error in getMeOrders:', error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getOrderByOrderNumber(req: Request, res: Response) {
        try {
            const { orderNumber } = req.params
            const order = await ordersService.getOrderByOrderNumber(orderNumber)

            if (!order) {
                return res.status(404).json({ error: 'Order not found' })
            }

            const formattedOrder = {
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
                items: (order as unknown as DBOrderWithUserAndItems).items.map(item => ({
                    description: item.product.title,
                    price: item.price,
                    quantity: item.quantity,
                    total: item.price * item.quantity
                }))
            }

            return res.status(200).json(formattedOrder)
        } catch (error) {
            console.error('Error in getOrderByOrderNumber:', error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async createOrder(req: Request, res: Response) {
        try {
            const userId = (req.user as { userId: number }).userId
            const { items } = req.body

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ error: 'Items are required' })
            }

            const newOrder = await ordersService.createOrder(userId, items)
            return res.status(201).json(newOrder)
        } catch (error) {
            console.error('Error in createOrder:', error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export const ordersController = new OrdersController()
