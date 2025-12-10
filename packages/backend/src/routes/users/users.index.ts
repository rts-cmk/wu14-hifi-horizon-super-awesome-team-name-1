import { jwt } from 'hono/jwt'
import env from '@/env'
import { createRouter } from '@/lib/create-app'

import * as handlers from '@/routes/users/users.handlers'
import * as routes from '@/routes/users/users.route'

const router = createRouter().openapi(routes.register, handlers.register).openapi(routes.login, handlers.login)

router.use('/users/me', jwt({ secret: env.JWT_SECRET }))
router.openapi(routes.me, handlers.me)

export default router
