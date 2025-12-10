import { createRouter } from '@/lib/create-app'
import { jwt } from 'hono/jwt'
import env from '@/env'

import * as handlers from '@/routes/orders/orders.handlers'
import * as routes from '@/routes/orders/orders.route'

const router = createRouter()

router.use('/orders', jwt({ secret: env.JWT_SECRET, cookie: 'auth_token' }))
router.use('/orders/*', jwt({ secret: env.JWT_SECRET, cookie: 'auth_token' }))

router
    .openapi(routes.list, handlers.list)
    .openapi(routes.create, handlers.create)
    .openapi(routes.getOne, handlers.getOne)

export default router
