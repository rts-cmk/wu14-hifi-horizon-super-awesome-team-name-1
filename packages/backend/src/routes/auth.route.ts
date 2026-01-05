import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import db from '@/db/index'
import { updateUserSchema, userInsertSchema, users } from '@/db/schema'
import env from '@/env'
import { catchErrors } from '@/lib/async'
import { AppError } from '@/lib/errors'
import { check } from '@/lib/validate'
import auth from '@/middleware/auth'

const router = Router()

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.coerce.boolean().default(false)
})

router.post(
    '/register',
    catchErrors(async (req, res) => {
        const validatedData = check(userInsertSchema, req.body)
        const { password, ...restOfUser } = validatedData

        const [existingUser] = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1)
        if (existingUser) throw new AppError('User already exists', 409)

        const hashedPassword = await bcrypt.hash(password, 10)
        const [newUser] = await db
            .insert(users)
            .values({
                ...restOfUser,
                password: hashedPassword,
                zipCode: restOfUser.zipCode ?? null,
                city: restOfUser.city ?? null
            })
            .returning()

        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, env.JWT_SECRET, { expiresIn: '1h' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            maxAge: 3_600_000,
            sameSite: 'lax'
        })

        return res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName }
        })
    })
)

router.post(
    '/login',
    catchErrors(async (req, res) => {
        const validatedData = check(loginSchema, req.body)
        const [user] = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1)

        if (!user || !(await bcrypt.compare(validatedData.password, user.password))) {
            throw new AppError('Invalid credentials', 401)
        }

        const expiresIn = validatedData.rememberMe ? '30d' : '1h'
        const maxAge = validatedData.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 3_600_000
        const token = jwt.sign({ userId: user.id, email: user.email }, env.JWT_SECRET, { expiresIn })

        res.cookie('token', token, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            maxAge,
            sameSite: 'lax'
        })

        return res.status(200).json({
            message: 'Logged in successfully',
            user: { id: user.id, email: user.email, fullName: user.fullName }
        })
    })
)

router.get('/auth/check', (req, res) => {
    const token = req.cookies.token
    if (!token) throw new AppError('Not authenticated', 401)

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET)
        return res.status(200).json({ authenticated: true, user: decoded })
    } catch (_err) {
        throw new AppError('Invalid or expired token', 401)
    }
})

router.post('/logout', auth, (_req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax'
    })
    return res.status(200).json({ message: 'Logged out successfully' })
})

router.get(
    '/me',
    auth,
    catchErrors(async (req, res) => {
        const userId = (req.user as { userId: number }).userId
        const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
        if (!user) throw new AppError('User not found', 404)

        const { password: _, ...userWithoutPassword } = user
        return res.status(200).json({ user: userWithoutPassword })
    })
)

router.patch(
    '/me',
    auth,
    catchErrors(async (req, res) => {
        const userId = (req.user as { userId: number }).userId
        const validatedData = check(updateUserSchema, req.body)
        if (Object.keys(validatedData).length === 0) throw new AppError('No fields to update', 400)

        const { password, ...rest } = validatedData
        const updateData: Record<string, unknown> = { ...rest, updatedAt: new Date() }
        if (password) updateData.password = await bcrypt.hash(password, 10)

        const [updatedUser] = await db.update(users).set(updateData).where(eq(users.id, userId)).returning()
        if (!updatedUser) throw new AppError('User not found', 404)

        const { password: _, ...userWithoutPassword } = updatedUser
        return res.status(200).json({ user: userWithoutPassword })
    })
)

export default router
