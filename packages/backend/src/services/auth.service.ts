import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { eq } from 'drizzle-orm'
import type { z } from 'zod'
import db from '@/db'
import { type updateUserSchema, type userInsertSchema, users } from '@/db/schema'

export class AuthService {
    async register(data: z.infer<typeof userInsertSchema>): Promise<InferSelectModel<typeof users>> {
        const { password, ...restOfUser } = data

        const existingUser = await db.select().from(users).where(eq(users.email, data.email)).limit(1)
        if (existingUser.length > 0) {
            throw new Error(`Registration failed: user already exists with email ${data.email}`)
        }

        const hashedPassword = await Bun.password.hash(password)

        // spread the validated input and explicitly coerce undefined -> null for nullable DB columns.
        // assert to InferInsertModel to satisfy Drizzle's `.values()` typing.
        const insertValues = {
            ...restOfUser,
            password: hashedPassword,
            zipCode: restOfUser.zipCode ?? null,
            city: restOfUser.city ?? null
        } as InferInsertModel<typeof users>

        try {
            const [newUser] = await db.insert(users).values(insertValues).returning()
            return newUser
        } catch (error) {
            console.error('Database error during user registration:', error)
            throw new Error('Registration failed: unable to create user in the database')
        }
    }

    async validateCredentials(email: string, password: string): Promise<InferSelectModel<typeof users> | null> {
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
        if (!user) return null

        const isValid = await Bun.password.verify(password, user.password)
        if (!isValid) return null

        return user
    }

    async getUserById(userId: number): Promise<InferSelectModel<typeof users> | undefined> {
        const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
        return user
    }

    async updateUser(
        userId: number,
        data: z.infer<typeof updateUserSchema>
    ): Promise<InferSelectModel<typeof users> | undefined> {
        const { password, ...rest } = data

        // partial of the insert model is fine for updates.
        const updateData: Partial<InferInsertModel<typeof users>> = {
            ...rest,
            updatedAt: new Date()
        }

        if (password) updateData.password = await Bun.password.hash(password)

        const [updatedUser] = await db.update(users).set(updateData).where(eq(users.id, userId)).returning()
        return updatedUser
    }
}

export const authService = new AuthService()
