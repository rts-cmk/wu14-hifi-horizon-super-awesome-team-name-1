import { eq } from 'drizzle-orm'
import type { z } from 'zod'
import db from '@/db'
import {
    productColors,
    type productCreateSchema,
    productDescriptions,
    productImages,
    productSpecifications,
    products,
    type productUpdateWithRelationsSchema
} from '@/db/schema'

export class ProductService {
    async getAllProducts() {
        return await db.query.products.findMany({
            with: {
                descriptions: {
                    orderBy: (descriptions, { asc }) => [asc(descriptions.sortOrder)]
                },
                colors: true,
                images: true,
                specifications: true
            }
        })
    }

    async getPaginatedProducts(page: number = 1, limit: number = 9) {
        const offset = (page - 1) * limit

        const [productList, totalCount] = await Promise.all([
            db.query.products.findMany({
                limit,
                offset,
                with: {
                    descriptions: {
                        orderBy: (descriptions, { asc }) => [asc(descriptions.sortOrder)]
                    },
                    colors: true,
                    images: true,
                    specifications: true
                },
                orderBy: (products, { desc }) => [desc(products.id)]
            }),
            db.select({ count: products.id }).from(products)
        ])

        return {
            products: productList,
            total: totalCount.length,
            page,
            totalPages: Math.ceil(totalCount.length / limit),
            hasNext: page * limit < totalCount.length,
            hasPrev: page > 1
        }
    }

    async getProductById(id: number) {
        return await db.query.products.findFirst({
            where: eq(products.id, id),
            with: {
                descriptions: {
                    orderBy: (descriptions, { asc }) => [asc(descriptions.sortOrder)]
                },
                colors: true,
                images: true,
                specifications: true
            }
        })
    }

    async createProduct(data: z.infer<typeof productCreateSchema>) {
        const { descriptions, colors, images, specifications, ...productData } = data

        return await db.transaction(async tx => {
            const [newProduct] = await tx.insert(products).values(productData).returning()

            if (!newProduct) {
                throw new Error('Failed to create product')
            }

            if (descriptions && descriptions.length > 0) {
                await tx.insert(productDescriptions).values(
                    descriptions.map((content: string, index: number) => ({
                        productId: newProduct.id,
                        content,
                        sortOrder: index
                    }))
                )
            }

            if (colors && colors.length > 0) {
                await tx.insert(productColors).values(
                    colors.map((color: string) => ({
                        productId: newProduct.id,
                        color
                    }))
                )
            }

            if (images && images.length > 0) {
                await tx.insert(productImages).values(
                    images.map((image: { url: string; alt?: string }) => ({
                        productId: newProduct.id,
                        url: image.url,
                        alt: image.alt
                    }))
                )
            }

            if (specifications && specifications.length > 0) {
                await tx.insert(productSpecifications).values(
                    specifications.map((spec: { label: string; value: string }) => ({
                        productId: newProduct.id,
                        label: spec.label,
                        value: spec.value
                    }))
                )
            }

            return await tx.query.products.findFirst({
                where: eq(products.id, newProduct.id),
                with: {
                    descriptions: true,
                    colors: true,
                    images: true,
                    specifications: true
                }
            })
        })
    }

    async updateProduct(id: number, data: z.infer<typeof productUpdateWithRelationsSchema>) {
        const { descriptions, colors, images, specifications, ...productData } = data

        return await db.transaction(async tx => {
            if (Object.keys(productData).length > 0) {
                await tx
                    .update(products)
                    .set({ ...productData, updatedAt: new Date() })
                    .where(eq(products.id, id))
            }

            const updates = []

            if (descriptions) {
                updates.push({
                    table: productDescriptions,
                    data: descriptions.map((content, index) => ({ productId: id, content, sortOrder: index }))
                })
            }

            if (colors) {
                updates.push({
                    table: productColors,
                    data: colors.map(color => ({ productId: id, color }))
                })
            }

            if (images) {
                updates.push({
                    table: productImages,
                    data: images.map(image => ({ productId: id, url: image.url, alt: image.alt }))
                })
            }

            if (specifications) {
                updates.push({
                    table: productSpecifications,
                    data: specifications.map(spec => ({ productId: id, label: spec.label, value: spec.value }))
                })
            }

            for (const update of updates) {
                await tx.delete(update.table).where(eq(update.table.productId, id))
                if (update.data.length > 0) {
                    await tx.insert(update.table).values(update.data)
                }
            }

            return await tx.query.products.findFirst({
                where: eq(products.id, id),
                with: {
                    descriptions: true,
                    colors: true,
                    images: true,
                    specifications: true
                }
            })
        })
    }

    async deleteProduct(id: number) {
        return await db.transaction(async tx => {
            await tx.delete(productDescriptions).where(eq(productDescriptions.productId, id))
            await tx.delete(productColors).where(eq(productColors.productId, id))
            await tx.delete(productImages).where(eq(productImages.productId, id))
            await tx.delete(productSpecifications).where(eq(productSpecifications.productId, id))

            const [deletedProduct] = await tx.delete(products).where(eq(products.id, id)).returning()
            return deletedProduct
        })
    }
}

export const productService = new ProductService()
