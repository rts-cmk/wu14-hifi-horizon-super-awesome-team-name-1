import dotenv from 'dotenv'

dotenv.config()

import { apiReference } from '@scalar/express-api-reference'
import cookieParser from 'cookie-parser'
import express, { type NextFunction, type Request, type Response } from 'express'
import { openApiSpec } from '@/openapi'
import authRoute from '@/routes/auth.route'
import indexRoute from '@/routes/index.route'
import productsRoute from '@/routes/products.route'
import env from './env'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/', indexRoute)
app.use('/', authRoute)
app.use('/', productsRoute)

app.use(
    '/docs',
    apiReference({
        content: openApiSpec
    })
)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.name.includes('token') ? 403 : 500
    const message = status === 403 ? 'invalid token.' : 'internal server error.'
    res.status(status).json({ error: message })
})

app.listen(env.PORT)
