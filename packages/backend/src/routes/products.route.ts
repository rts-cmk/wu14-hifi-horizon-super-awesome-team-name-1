import { eq, sql } from 'drizzle-orm'
import { Router } from 'express'
import { z } from 'zod'
import db from '@/db/index'
import {
    productColors,
    productCreateSchema,
    productDescriptions,
    productImages,
    productSpecifications,
    products,
    productUpdateWithRelationsSchema
} from '@/db/schema'
import { catchErrors } from '@/lib/async'
import { AppError } from '@/lib/errors'
import { check } from '@/lib/validate'

const router = Router()

router.get(
    '/products',
    catchErrors(async (_req, res) => {
        const productList = await db.query.products.findMany({
            with: {
                descriptions: {
                    orderBy: (descriptions, { asc }) => [asc(descriptions.sortOrder)]
                },
                colors: true,
                images: true,
                specifications: true
            }
        })

        const formattedProducts = productList.map(product => ({
            ...product,
            descriptions: product.descriptions.map(d => d.content),
            colors: product.colors.map(c => ({ id: c.id, hex: c.hex, name: c.name }))
        }))

        return res.status(200).json(formattedProducts)
    })
)

router.get(
    '/products/paginated',
    catchErrors(async (req, res) => {
        const { page, limit } = z
            .object({
                page: z.coerce.number().min(1).default(1),
                limit: z.coerce.number().min(1).max(50).default(9)
            })
            .parse(req.query)

        const offset = (page - 1) * limit

        const [productList, totalCountResult] = await Promise.all([
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
            db.select({ count: sql<number>`count(*)` }).from(products)
        ])

        const totalCount = Number(totalCountResult[0].count)

        const formattedProducts = productList.map(product => ({
            ...product,
            descriptions: product.descriptions.map(d => d.content),
            colors: product.colors.map(c => ({ id: c.id, hex: c.hex, name: c.name }))
        }))

        return res.status(200).json({
            products: formattedProducts,
            pagination: {
                page,
                totalPages: Math.ceil(totalCount / limit),
                total: totalCount,
                hasNext: page * limit < totalCount,
                hasPrev: page > 1
            }
        })
    })
)

router.get(
    '/products/:id',
    catchErrors(async (req, res) => {
        const productId = Number.parseInt(req.params.id, 10)
        if (Number.isNaN(productId)) throw new AppError('Invalid product ID', 400)

        const product = await db.query.products.findFirst({
            where: eq(products.id, productId),
            with: {
                descriptions: {
                    orderBy: (descriptions, { asc }) => [asc(descriptions.sortOrder)]
                },
                colors: true,
                images: true,
                specifications: true
            }
        })

        if (!product) throw new AppError('Product not found', 404)

        return res.status(200).json({
            ...product,
            descriptions: product.descriptions.map(d => d.content),
            colors: product.colors.map(c => ({ id: c.id, hex: c.hex, name: c.name }))
        })
    })
)

router.post(
    '/products',
    catchErrors(async (req, res) => {
        const validatedData = check(productCreateSchema, req.body)
        const { descriptions, colors, images, specifications, ...productData } = validatedData

        const newProductWithRelations = await db.transaction(async tx => {
            const [newProduct] = await tx.insert(products).values(productData).returning()
            if (!newProduct) throw new AppError('Failed to create product')

            if (descriptions?.length) {
                await tx
                    .insert(productDescriptions)
                    .values(
                        descriptions.map((content, index) => ({ productId: newProduct.id, content, sortOrder: index }))
                    )
            }
            if (colors?.length) {
                await tx
                    .insert(productColors)
                    .values(colors.map(color => ({ productId: newProduct.id, hex: color.hex, name: color.name })))
            }
            if (images?.length) {
                await tx
                    .insert(productImages)
                    .values(images.map(image => ({ productId: newProduct.id, url: image.url, alt: image.alt })))
            }
            if (specifications?.length) {
                await tx
                    .insert(productSpecifications)
                    .values(
                        specifications.map(spec => ({ productId: newProduct.id, label: spec.label, value: spec.value }))
                    )
            }

            return await tx.query.products.findFirst({
                where: eq(products.id, newProduct.id),
                with: { descriptions: true, colors: true, images: true, specifications: true }
            })
        })

        return res.status(201).json({
            message: 'Product created successfully',
            product: {
                ...newProductWithRelations,
                descriptions: newProductWithRelations?.descriptions.map(d => d.content) || [],
                colors: newProductWithRelations?.colors.map(c => ({ id: c.id, hex: c.hex, name: c.name })) || []
            }
        })
    })
)

router.patch(
    '/products/:id',
    catchErrors(async (req, res) => {
        const productId = Number.parseInt(req.params.id, 10)
        if (Number.isNaN(productId)) throw new AppError('Invalid product ID', 400)

        const validatedData = check(productUpdateWithRelationsSchema, req.body)
        const { descriptions, colors, images, specifications, ...productData } = validatedData

        const updatedProductWithRelations = await db.transaction(async tx => {
            if (Object.keys(productData).length > 0) {
                await tx
                    .update(products)
                    .set({ ...productData, updatedAt: new Date() })
                    .where(eq(products.id, productId))
            }

            const updates = [
                {
                    table: productDescriptions,
                    data: descriptions?.map((content, index) => ({ productId: productId, content, sortOrder: index }))
                },
                {
                    table: productColors,
                    data: colors?.map(color => ({ productId: productId, hex: color.hex, name: color.name }))
                },
                {
                    table: productImages,
                    data: images?.map(image => ({ productId: productId, url: image.url, alt: image.alt }))
                },
                {
                    table: productSpecifications,
                    data: specifications?.map(spec => ({ productId: productId, label: spec.label, value: spec.value }))
                }
            ]

            for (const update of updates) {
                if (update.data) {
                    await tx.delete(update.table).where(eq(update.table.productId, productId))
                    if (update.data.length > 0) await tx.insert(update.table).values(update.data)
                }
            }

            return await tx.query.products.findFirst({
                where: eq(products.id, productId),
                with: { descriptions: true, colors: true, images: true, specifications: true }
            })
        })

        if (!updatedProductWithRelations) throw new AppError('Product not found', 404)

        return res.status(200).json({
            message: 'Product updated successfully',
            product: {
                ...updatedProductWithRelations,
                descriptions: updatedProductWithRelations.descriptions.map(d => d.content),
                colors: updatedProductWithRelations.colors.map(c => ({ id: c.id, hex: c.hex, name: c.name }))
            }
        })
    })
)

router.delete(
    '/products/:id',
    catchErrors(async (req, res) => {
        const productId = Number.parseInt(req.params.id, 10)
        if (Number.isNaN(productId)) throw new AppError('Invalid product ID', 400)

        const deletedProduct = await db.transaction(async tx => {
            await tx.delete(productDescriptions).where(eq(productDescriptions.productId, productId))
            await tx.delete(productColors).where(eq(productColors.productId, productId))
            await tx.delete(productImages).where(eq(productImages.productId, productId))
            await tx.delete(productSpecifications).where(eq(productSpecifications.productId, productId))
            const [deleted] = await tx.delete(products).where(eq(products.id, productId)).returning()
            return deleted
        })

        if (!deletedProduct) throw new AppError('Product not found', 404)
        return res.status(200).json({ message: 'Product deleted successfully' })
    })
)

export default router
