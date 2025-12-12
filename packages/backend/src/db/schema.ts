import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

// Users
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

// Products
export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    brand: text('brand').notNull(),
    price: integer('price').notNull(), // Price in cents
    stock: integer('stock').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const productDescriptions = pgTable('product_descriptions', {
    id: serial('id').primaryKey(),
    productId: integer('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    sortOrder: integer('sort_order').notNull().default(0)
})

export const productColors = pgTable('product_colors', {
    id: serial('id').primaryKey(),
    productId: integer('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    color: text('color').notNull()
})

export const productImages = pgTable('product_images', {
    id: serial('id').primaryKey(),
    productId: integer('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    alt: text('alt')
})

export const productSpecifications = pgTable('product_specifications', {
    id: serial('id').primaryKey(),
    productId: integer('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    label: text('label').notNull(), // e.g., "Frequency Response", "Connectivity"
    value: text('value').notNull() // e.g., "20Hz - 20kHz", "WiFi, Bluetooth 5.0"
})

export const productSchema = createSelectSchema(products)
export const productInsertSchema = createInsertSchema(products).omit({
    id: true,
    createdAt: true,
    updatedAt: true
})

export const productUpdateSchema = createInsertSchema(products)
    .omit({ id: true, createdAt: true, updatedAt: true })
    .partial()

// Hex color validation (e.g., "#1a1a1a" or "#fff")
const hexColorSchema = z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color (e.g., #1a1a1a)')

const specificationSchema = z.object({
    label: z.string(),
    value: z.string()
})

export const productCreateSchema = productInsertSchema.extend({
    descriptions: z.array(z.string()).min(1, 'At least one description is required'),
    colors: z.array(hexColorSchema).min(1, 'At least one color is required'),
    images: z.array(z.object({ url: z.url(), alt: z.string().optional() })).min(1, 'At least one image is required'),
    specifications: z.array(specificationSchema).optional()
})

export const productUpdateWithRelationsSchema = productUpdateSchema.extend({
    descriptions: z.array(z.string()).optional(),
    colors: z.array(hexColorSchema).optional(),
    images: z.array(z.object({ url: z.url(), alt: z.string().optional() })).optional(),
    specifications: z.array(specificationSchema).optional()
})
