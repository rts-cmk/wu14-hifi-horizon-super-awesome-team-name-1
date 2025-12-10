import { sql } from 'drizzle-orm'
import { check, integer, json, pgTable, serial, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
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

export const productSchema = createSelectSchema(products, {
    materials: z.array(z.unknown()),
    specifications: z.record(z.string(), z.unknown())
})

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
