import { Router } from 'express'
import { ordersController } from '@/controllers/orders.controller'
import auth from '@/middleware/auth'

const router = Router()

router.get('/me/orders', auth, ordersController.getMeOrders)
router.get('/orders/:orderNumber', ordersController.getOrderByOrderNumber)
router.post('/orders', auth, ordersController.createOrder)

export default router
