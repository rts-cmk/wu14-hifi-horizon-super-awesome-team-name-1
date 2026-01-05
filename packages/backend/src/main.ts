import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type NextFunction, type Request, type Response } from 'express'
import env from '@/env'
import authRoute from '@/routes/auth.route'
import contactRoute from '@/routes/contact.route'
import ordersRoute from '@/routes/orders.route'
import productsRoute from '@/routes/products.route'

const app = express()

app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                'https://hifi-frontend-sepia.vercel.app',
                'https://hifi-frontend.vercel.app',
                ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000', 'http://localhost:5173'] : [])
            ]
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true
    })
)

app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Welcome to the HIFI Horizon API!' })
})

app.get('/health', (_req: Request, res: Response) => {
    res.send('ok baby, ja den er oppe!')
})

app.use('/', authRoute)
app.use('/contact', contactRoute)
app.use('/', productsRoute)
app.use('/', ordersRoute)

app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' })
})

app.use((err: Error & { statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({ error: message })
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(env.PORT, () => {})
}

export default app
