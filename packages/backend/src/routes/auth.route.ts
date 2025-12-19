import { Router } from 'express'
import { authController } from '@/controllers/auth.controller'
import auth from '@/middleware/auth'

const router = Router()

router.post('/register', authController.register)
router.get('/auth/check', authController.checkAuth)
router.post('/login', authController.login)
router.post('/logout', auth, authController.logout)
router.get('/me', auth, authController.getMe)
router.patch('/me', auth, authController.updateMe)

export default router
