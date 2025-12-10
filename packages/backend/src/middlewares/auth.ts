import { createMiddleware } from 'hono/factory'
import * as HttpStatusCodes from 'stoker/http-status-codes'

export const admin = createMiddleware(async (c, next) => {
    const payload = c.get('jwtPayload')
    if (payload?.role !== 'admin') {
        return c.json({ message: 'Forbidden' }, HttpStatusCodes.FORBIDDEN)
    }
    await next()
})
