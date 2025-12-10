import * as HttpStatusCodes from 'stoker/http-status-codes'
import db from '@/db'
import { userSchema, users } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import type { RegisterRoute } from './users.route'

export const register: AppRouteHandler<RegisterRoute> = async c => {
    const data = c.req.valid('json')

    const hashedPassword = await Bun.password.hash(data.password)

    const [user] = await db
        .insert(users)
        .values({
            ...data,
            password: hashedPassword
        })
        .returning()

    return c.json(userSchema.parse(user), HttpStatusCodes.CREATED)
}
