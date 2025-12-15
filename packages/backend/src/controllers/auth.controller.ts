import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { updateUserSchema, userInsertSchema } from '@/db/schema'
import env from '@/env'
import { authService } from '@/services/auth.service'

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1)
})

export class AuthController {
    checkAuth(req: Request, res: Response) {
        try {
            const token = req.cookies.token

            if (!token) {
                return res.status(401).json({ error: 'Not authenticated' })
            }

            try {
                const decoded = jwt.verify(token, env.JWT_SECRET)
                return res.status(200).json({ authenticated: true, user: decoded })
            } catch (_err) {
                return res.status(401).json({ error: 'Invalid or expired token' })
            }
        } catch (error) {
            console.error('Error in checkAuth:', error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async register(req: Request, res: Response) {
        try {
            const validatedData = userInsertSchema.parse(req.body)

            try {
                const newUser = await authService.register(validatedData)

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
            } catch (err: unknown) {
                if (err instanceof Error && err.message === 'User already exists') {
                    return res.status(409).json({ error: 'User already exists' })
                }
                throw err
            }
        } catch (error) {
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({ error: 'Invalid input', details: error })
            }
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const validatedData = loginSchema.parse(req.body)

            const user = await authService.validateCredentials(validatedData.email, validatedData.password)

            if (!user) {
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
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({ error: 'Invalid input', details: error })
            }
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async logout(_req: Request, res: Response) {
        await res.clearCookie('token', {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'lax'
        })
        return res.status(200).json({ message: 'Logged out successfully' })
    }

    async getMe(req: Request, res: Response) {
        try {
            const userId = (req.user as { userId: number }).userId
            const user = await authService.getUserById(userId)

            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            const { password: _, ...userWithoutPassword } = user
            return res.status(200).json({ user: userWithoutPassword })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async updateMe(req: Request, res: Response) {
        try {
            const userId = (req.user as { userId: number }).userId
            const validatedData = updateUserSchema.parse(req.body)

            if (Object.keys(validatedData).length === 0) {
                return res.status(400).json({ error: 'No fields to update' })
            }

            const updatedUser = await authService.updateUser(userId, validatedData)

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
    }
}

export const authController = new AuthController()
