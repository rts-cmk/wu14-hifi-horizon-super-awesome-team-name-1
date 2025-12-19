import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string()
})

export type Env = z.infer<typeof envSchema>

let env: Env

try {
    env = envSchema.parse({
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET
    })
} catch (e) {
    const error = e as z.ZodError
    console.error('❌ invalid environment variables:', z.treeifyError(error))
    process.exit(1)
}

export default env
