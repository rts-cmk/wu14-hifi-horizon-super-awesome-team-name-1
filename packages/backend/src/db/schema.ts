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
    role: text('role').notNull().default('customer'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    orderNumber: text('order_number').notNull().unique(),
    userId: integer('user_id')
        .references(() => users.id)
        .notNull(),
    total: integer('total').notNull(),
    subtotal: integer('subtotal').notNull(),
    vat: integer('vat').notNull(),
    delivery: integer('delivery').notNull(),
    status: text('status').notNull().default('pending'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    
    // Customer Snapshot
    customerName: text('customer_name').notNull(),
    customerEmail: text('customer_email').notNull(),
    customerPhone: text('customer_phone'),
    customerAddress: text('customer_address').notNull(),
    customerAddress2: text('customer_address2'),
    customerZip: text('customer_zip').notNull(),
    customerCity: text('customer_city').notNull(),
    customerCountry: text('customer_country')
})

export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: integer('order_id')
        .references(() => orders.id)
        .notNull(),
    productId: integer('product_id').references(() => products.id),
    
    // Product Snapshot
    productName: text('product_name').notNull(),
    productBrand: text('product_brand').notNull(),
    price: integer('price').notNull(),
    quantity: integer('quantity').notNull()
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

export const ordersRelations = relations(orders, ({ many, one }) => ({
    items: many(orderItems),
    user: one(users, {
        fields: [orders.userId],
        references: [users.id]
    })
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id]
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
export const userInsertSchema = createInsertSchema(users).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    role: true
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
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

export const orderItemSchema = createSelectSchema(orderItems)
export const orderSchema = createSelectSchema(orders).extend({
    items: z.array(orderItemSchema),
    shop: z.literal('342 HIFI Horizon - Falkirk').default('342 HIFI Horizon - Falkirk'),
    currency: z.literal('DKK').default('DKK')
})

export const createOrderSchema = z.object({
    items: z.array(z.object({
        productId: z.number(),
        quantity: z.number().min(1)
    })),
    deliveryMethod: z.enum(['standard', 'express']).default('standard'),
    customerDetails: z.object({
        fullName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        address: z.string(),
        address2: z.string().optional(),
        zipCode: z.string(),
        city: z.string(),
        country: z.string().optional()
    })
})
