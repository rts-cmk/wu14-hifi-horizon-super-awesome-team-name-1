import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name').notNull(),
    address: text('address').notNull(),
    address2: text('address2'),
    zipCode: text('zip_code'),
    city: text('city'),
    country: text('country'),
    phone: text('phone'),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: text('role').notNull().default('customer'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const userSchema = createSelectSchema(users).omit({ password: true })
export const userInsertSchema = createInsertSchema(users)
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        role: true
    })
    .partial({
        zipCode: true,
        city: true
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

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    brand: text('brand').notNull(),
    category: text('category'),
    price: integer('price').notNull(),
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
    label: text('label').notNull(),
    value: text('value').notNull()
})

export const productsRelations = relations(products, ({ many }) => ({
    descriptions: many(productDescriptions),
    colors: many(productColors),
    images: many(productImages),
    specifications: many(productSpecifications)
}))

export const productDescriptionsRelations = relations(productDescriptions, ({ one }) => ({
    product: one(products, {
        fields: [productDescriptions.productId],
        references: [products.id]
    })
}))

export const productColorsRelations = relations(productColors, ({ one }) => ({
    product: one(products, {
        fields: [productColors.productId],
        references: [products.id]
    })
}))

export const productImagesRelations = relations(productImages, ({ one }) => ({
    product: one(products, {
        fields: [productImages.productId],
        references: [products.id]
    })
}))

export const productSpecificationsRelations = relations(productSpecifications, ({ one }) => ({
    product: one(products, {
        fields: [productSpecifications.productId],
        references: [products.id]
    })
}))

export const productSchema = createSelectSchema(products)
export const productInsertSchema = createInsertSchema(products).omit({
    id: true,
    createdAt: true,
    updatedAt: true
})

export const productUpdateSchema = createInsertSchema(products)
    .omit({ id: true, createdAt: true, updatedAt: true })
    .partial()

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

export const contactMessages = pgTable('contact_messages', {
    id: serial('id').primaryKey(),
    fullName: text('full_name').notNull(),
    email: text('email').notNull(),
    subject: text('subject').notNull(),
    message: text('message').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
})

export const contactMessageSchema = createSelectSchema(contactMessages)
export const contactMessageInsertSchema = createInsertSchema(contactMessages).omit({
    id: true,
    createdAt: true
})

export const productUpdateWithRelationsSchema = productUpdateSchema.extend({
    descriptions: z.array(z.string()).optional(),
    colors: z.array(hexColorSchema).optional(),
    images: z.array(z.object({ url: z.url(), alt: z.string().optional() })).optional(),
    specifications: z.array(specificationSchema).optional()
})

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    orderNumber: text('order_number').notNull().unique(),
    userId: integer('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    total: integer('total').notNull(),
    status: text('status').notNull().default('processing'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: integer('order_id')
        .notNull()
        .references(() => orders.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
        .notNull()
        .references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull()
})

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id]
    }),
    items: many(orderItems)
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id]
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id]
    })
}))

export const orderSchema = createSelectSchema(orders)
export const orderInsertSchema = createInsertSchema(orders).omit({
    id: true,
    orderNumber: true,
    createdAt: true,
    updatedAt: true
})

export const orderItemSchema = createSelectSchema(orderItems)
export const orderItemInsertSchema = createInsertSchema(orderItems).omit({
    id: true
})
