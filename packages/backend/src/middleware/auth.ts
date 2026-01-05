declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string
        }
    }
}

import type { NextFunction, Request, Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import env from '@/env'
import { AppError } from '@/lib/errors'

function auth(req: Request, _res: Response, next: NextFunction) {
    const token = req.cookies.token

    if (!token) {
        throw new AppError('Unauthorized', 401)
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
        req.user = decoded
        next()
    } catch (_err) {
        throw new AppError('Invalid or expired token', 401)
    }
}

export default auth
