import { jwt } from 'hono/jwt'
import env from '@/env'
import { createRouter } from '@/lib/create-app'

import * as handlers from '@/routes/users/users.handlers'
import * as routes from '@/routes/users/users.route'

const router = createRouter()
    .openapi(routes.register, handlers.register)
    .openapi(routes.login, handlers.login)
    .openapi(routes.logout, handlers.logout)

router.use('/users/me', jwt({ secret: env.JWT_SECRET, cookie: 'auth_token' }))
router.openapi(routes.me, handlers.me)
router.openapi(routes.update, handlers.update)

export default router
