import { eq } from 'drizzle-orm'
import { type Request, type Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import db from '@/db'
import { updateUserSchema, userInsertSchema, users } from '@/db/schema'
import env from '@/env'
import auth from '@/middleware/auth'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
    try {
        const validatedData = userInsertSchema.parse(req.body)

        const existingUser = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1)

        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'User already exists' })
        }

        const { password, ...restOfUser } = validatedData
        const hashedPassword = await Bun.password.hash(password)

        const [newUser] = await db
            .insert(users)
            .values({
                ...restOfUser,
                password: hashedPassword
            })
            .returning()

        if (!newUser) {
            return res.status(500).json({ error: 'Failed to create user' })
        }

        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email
            },
            env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            maxAge: 3_600_000,
            sameSite: 'lax'
        })

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                fullName: newUser.fullName
            }
        })
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            return res.status(400).json({ error: 'Invalid input', details: error })
        }

        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const isValidPassword = await Bun.password.verify(password, user.password)

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            maxAge: 3_600_000,
            sameSite: 'lax'
        })

        return res.status(200).json({
            message: 'Logged in successfully',
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

router.post('/logout', auth, (_req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax'
    })

    return res.status(200).json({ message: 'Logged out successfully' })
})

router.get('/me', auth, async (req: Request, res: Response) => {
    try {
        const userId = (
            req.user as {
                userId: number
            }
        ).userId

        const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const { password: _, ...userWithoutPassword } = user

        return res.status(200).json({ user: userWithoutPassword })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

router.patch('/me', auth, async (req: Request, res: Response) => {
    try {
        const userId = (req.user as { userId: number }).userId
        const validatedData = updateUserSchema.parse(req.body)

        if (Object.keys(validatedData).length === 0) {
            return res.status(400).json({ error: 'No fields to update' })
        }

        const { password, ...rest } = validatedData
        const updateData = {
            ...rest,
            ...(password && { password: await Bun.password.hash(password) }),
            updatedAt: new Date()
        }

        const [updatedUser] = await db.update(users).set(updateData).where(eq(users.id, userId)).returning()

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const { password: _, ...userWithoutPassword } = updatedUser

        return res.status(200).json({ user: userWithoutPassword })
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            return res.status(400).json({ error: 'Invalid input', details: error })
        }

        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

export default router
