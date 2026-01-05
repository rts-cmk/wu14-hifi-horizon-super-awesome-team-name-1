import { config } from 'dotenv'
import { treeifyError, z } from 'zod'

config()

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(8080),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    PROXY_SECRET: z.string().min(1).optional()
})

export type Env = z.infer<typeof envSchema>

let env: Env

try {
    env = envSchema.parse(process.env)
} catch (e) {
    const error = e as z.ZodError
    console.error('❌ invalid environment variables:', treeifyError(error))
    process.exit(1)
}

export default env
