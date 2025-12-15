import { eq } from 'drizzle-orm'
import type { z } from 'zod'
import db from '@/db'
import { type updateUserSchema, type userInsertSchema, users } from '@/db/schema'

export class AuthService {
    async register(data: z.infer<typeof userInsertSchema>) {
        const { password, ...restOfUser } = data

        const existingUser = await db.select().from(users).where(eq(users.email, data.email)).limit(1)
        if (existingUser.length > 0) {
            throw new Error('User already exists')
        }

        const hashedPassword = await Bun.password.hash(password)

        const [newUser] = await db
            .insert(users)
            .values({
                ...restOfUser,
                password: hashedPassword
            })
            .returning()

        return newUser
    }

    async validateCredentials(email: string, password: string) {
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)

        if (!user) {
            return null
        }

        const isValidPassword = await Bun.password.verify(password, user.password)

        if (!isValidPassword) {
            return null
        }

        return user
    }

    async getUserById(userId: number) {
        const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
        return user
    }

    async updateUser(userId: number, data: z.infer<typeof updateUserSchema>) {
        const { password, ...rest } = data

        const updateData = {
            ...rest,
            ...(password && { password: await Bun.password.hash(password) }),
            updatedAt: new Date()
        }

        const [updatedUser] = await db.update(users).set(updateData).where(eq(users.id, userId)).returning()
        return updatedUser
    }
}

export const authService = new AuthService()
