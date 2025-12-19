import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '@/db/schema'
import env from '@/env'

const db = drizzle({
    connection: {
        url: env.DATABASE_URL
    },
    casing: 'snake_case',
    schema
})

export default db
