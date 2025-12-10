import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name').notNull(),
    address: text('address').notNull(),
    address2: text('address2'),
    zipCode: text('zip_code').notNull(),
    city: text('city').notNull(),
    country: text('country'),
    phone: text('phone'),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: text('role').notNull().default('customer'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const userSchema = createSelectSchema(users).omit({ password: true })
export const userInsertSchema = createInsertSchema(users).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    role: true
})

export const updateUserSchema = createInsertSchema(users)
    .omit({ id: true, createdAt: true, updatedAt: true, password: true, role: true })
    .partial()
    .extend({
        password: z.string().optional(),
        confirmPassword: z.string().optional()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })
