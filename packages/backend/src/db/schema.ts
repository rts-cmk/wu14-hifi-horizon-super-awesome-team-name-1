import { relations, sql } from 'drizzle-orm'
import { check, integer, json, pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const products = pgTable(
    'products',
    {
        id: serial('id').primaryKey(),
        brand: text('brand').notNull(),
        name: text('name').notNull(),
        description: text('description').notNull(),
        materials: json('materials').notNull(),
        price: integer('price').notNull(),
        stock: integer('stock').notNull().default(0),
        specifications: json('specifications').notNull(),
        category: integer('category_id')
            .references(() => productCategories.id)
            .notNull()
    },
    t => [
        uniqueIndex('unique_brand_name').on(t.brand, t.name),
        check('price_greater_than_zero', sql`${t.price} > 0`),
        check('stock_greater_than_or_equal_to_zero', sql`${t.stock} >= 0`)
    ]
)

export const productImages = pgTable('product_images', {
    id: serial('id').primaryKey(),
    productId: integer('product_id')
        .references(() => products.id)
        .notNull(),
    image: text('image').notNull()
})

export const productCategories = pgTable('product_categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull()
})

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
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const productsRelations = relations(products, ({ many }) => ({
    images: many(productImages)
}))

export const productImagesRelations = relations(productImages, ({ one }) => ({
    product: one(products, {
        fields: [productImages.productId],
        references: [products.id]
    })
}))

export const productSchema = createSelectSchema(products, {
    materials: z.array(z.unknown()),
    specifications: z.record(z.string(), z.unknown())
}).extend({
    images: z
        .array(
            z.object({
                id: z.number(),
                productId: z.number(),
                image: z.string()
            })
        )
        .optional()
})

export const productCreateSchema = createInsertSchema(products, {
    materials: z.array(z.unknown()),
    specifications: z.record(z.string(), z.unknown())
}).omit({ id: true })

export const patchProductSchema = productCreateSchema.partial()

export const userSchema = createSelectSchema(users).omit({ password: true })
export const userInsertSchema = createInsertSchema(users).omit({ id: true, createdAt: true, updatedAt: true })

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})

export const updateUserSchema = createInsertSchema(users)
    .omit({ id: true, createdAt: true, updatedAt: true, password: true })
    .partial()
    .extend({
        password: z.string().optional(),
        confirmPassword: z.string().optional()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })
