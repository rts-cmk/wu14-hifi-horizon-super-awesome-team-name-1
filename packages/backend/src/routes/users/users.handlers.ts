import * as HttpStatusCodes from 'stoker/http-status-codes'
import { eq } from 'drizzle-orm'
import { sign } from 'hono/jwt'
import db from '@/db'
import { userSchema, users } from '@/db/schema'
import env from '@/env'
import type { AppRouteHandler } from '@/lib/types'
import type { LoginRoute, MeRoute, RegisterRoute } from './users.route'

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

export const login: AppRouteHandler<LoginRoute> = async c => {
    const { email, password } = c.req.valid('json')

    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if (!user) {
        return c.json({ message: 'Invalid credentials' }, HttpStatusCodes.UNAUTHORIZED)
    }

    const validPassword = await Bun.password.verify(password, user.password)

    if (!validPassword) {
        return c.json({ message: 'Invalid credentials' }, HttpStatusCodes.UNAUTHORIZED)
    }

    const token = await sign(
        {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 // 8 hours
        },
        env.JWT_SECRET
    )

    return c.json({ token }, HttpStatusCodes.OK)
}

export const me: AppRouteHandler<MeRoute> = async c => {
    const payload = c.get('jwtPayload')
    const userId = payload.id

    const user = await db.query.users.findFirst({
        where: eq(users.id, userId)
    })

    if (!user) {
        return c.json({ message: 'User not found' }, HttpStatusCodes.UNAUTHORIZED)
    }

    return c.json(userSchema.parse(user), HttpStatusCodes.OK)
}
