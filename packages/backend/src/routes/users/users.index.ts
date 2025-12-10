import { createRouter } from '@/lib/create-app'

import * as handlers from '@/routes/users/users.handlers'
import * as routes from '@/routes/users/users.route'

const router = createRouter().openapi(routes.register, handlers.register)

export default router
