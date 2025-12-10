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

    // if this line throws, it goes to error handler automatically
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    req.user = decoded

    // move to the next handler in the chain
    return next()
}

export default auth
