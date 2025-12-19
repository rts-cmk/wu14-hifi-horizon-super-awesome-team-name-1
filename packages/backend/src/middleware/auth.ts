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

function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized.'
        })
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    req.user = decoded

    return next()
}

export default auth
