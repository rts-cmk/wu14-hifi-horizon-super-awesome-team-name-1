import { jwt } from 'hono/jwt'
import env from '@/env'
import { createRouter } from '@/lib/create-app'
import { admin } from '@/middlewares/auth'

import * as handlers from '@/routes/products/products.handlers'
import * as routes from '@/routes/products/products.route'

const router = createRouter().openapi(routes.list, handlers.list).openapi(routes.getOne, handlers.getOne)

router.use('/products', jwt({ secret: env.JWT_SECRET, cookie: 'auth_token' }))
router.use('/products/*', jwt({ secret: env.JWT_SECRET, cookie: 'auth_token' }))

router.use('/products', admin)
router.use('/products/*', admin)

router
    .openapi(routes.create, handlers.create)
    .openapi(routes.patch, handlers.patch)
    .openapi(routes.remove, handlers.remove)

export default router
