import { asc, eq } from 'drizzle-orm'
import { type Request, type Response, Router } from 'express'
import db from '@/db'
import {
    productColors,
    productCreateSchema,
    productDescriptions,
    productImages,
    productSpecifications,
    products,
    productUpdateWithRelationsSchema
} from '@/db/schema'

const router = Router()

router.get('/products', async (_req: Request, res: Response) => {
    try {
        const allProducts = await db.select().from(products)

        const productsWithRelations = await Promise.all(
            allProducts.map(async product => {
                const descriptions = await db
                    .select({ content: productDescriptions.content })
                    .from(productDescriptions)
                    .where(eq(productDescriptions.productId, product.id))
                    .orderBy(asc(productDescriptions.sortOrder))

                const colors = await db
                    .select({ color: productColors.color })
                    .from(productColors)
                    .where(eq(productColors.productId, product.id))

                const images = await db
                    .select({ id: productImages.id, url: productImages.url, alt: productImages.alt })
                    .from(productImages)
                    .where(eq(productImages.productId, product.id))

                const specifications = await db
                    .select({ label: productSpecifications.label, value: productSpecifications.value })
                    .from(productSpecifications)
                    .where(eq(productSpecifications.productId, product.id))

                return {
                    ...product,
                    descriptions: descriptions.map(d => d.content),
                    colors: colors.map(c => c.color),
                    images,
                    specifications
                }
            })
        )

        return res.status(200).json(productsWithRelations)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const productId = Number.parseInt(id, 10)

        if (Number.isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid product ID' })
        }

        const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1)

        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }

        const descriptions = await db
            .select({ content: productDescriptions.content })
            .from(productDescriptions)
            .where(eq(productDescriptions.productId, product.id))
            .orderBy(asc(productDescriptions.sortOrder))

        const colors = await db
            .select({ color: productColors.color })
            .from(productColors)
            .where(eq(productColors.productId, product.id))

        const images = await db
            .select({ id: productImages.id, url: productImages.url, alt: productImages.alt })
            .from(productImages)
            .where(eq(productImages.productId, product.id))

        const specifications = await db
            .select({ label: productSpecifications.label, value: productSpecifications.value })
            .from(productSpecifications)
            .where(eq(productSpecifications.productId, product.id))

        return res.status(200).json({
            ...product,
            descriptions: descriptions.map(d => d.content),
            colors: colors.map(c => c.color),
            images,
            specifications
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

router.post('/products', async (req: Request, res: Response) => {
    try {
        const validatedData = productCreateSchema.parse(req.body)
        const { descriptions, colors, images, specifications, ...productData } = validatedData

        const [newProduct] = await db.insert(products).values(productData).returning()

        if (!newProduct) {
            return res.status(500).json({ error: 'Failed to create product' })
        }

        if (descriptions.length > 0) {
            await db.insert(productDescriptions).values(
                descriptions.map((content, index) => ({
                    productId: newProduct.id,
                    content,
                    sortOrder: index
                }))
            )
        }

        if (colors.length > 0) {
            await db.insert(productColors).values(colors.map(color => ({ productId: newProduct.id, color })))
        }

        if (images.length > 0) {
            await db
                .insert(productImages)
                .values(images.map(image => ({ productId: newProduct.id, url: image.url, alt: image.alt })))
        }

        if (specifications && specifications.length > 0) {
            await db
                .insert(productSpecifications)
                .values(
                    specifications.map(spec => ({ productId: newProduct.id, label: spec.label, value: spec.value }))
                )
        }

        return res.status(201).json({
            message: 'Product created successfully',
            product: { ...newProduct, descriptions, colors, images, specifications: specifications || [] }
        })
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            return res.status(400).json({ error: 'Invalid input', details: error })
        }

        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

router.patch('/products/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const productId = Number.parseInt(id, 10)

        if (Number.isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid product ID' })
        }

        const validatedData = productUpdateWithRelationsSchema.parse(req.body)
        const { descriptions, colors, images, specifications, ...productData } = validatedData

        if (Object.keys(productData).length > 0) {
            await db
                .update(products)
                .set({ ...productData, updatedAt: new Date() })
                .where(eq(products.id, productId))
        }

        if (descriptions) {
            await db.delete(productDescriptions).where(eq(productDescriptions.productId, productId))
            if (descriptions.length > 0) {
                await db.insert(productDescriptions).values(
                    descriptions.map((content, index) => ({
                        productId,
                        content,
                        sortOrder: index
                    }))
                )
            }
        }

        if (colors) {
            await db.delete(productColors).where(eq(productColors.productId, productId))
            if (colors.length > 0) {
                await db.insert(productColors).values(
                    colors.map(color => ({
                        productId,
                        color
                    }))
                )
            }
        }

        if (images) {
            await db.delete(productImages).where(eq(productImages.productId, productId))
            if (images.length > 0) {
                await db
                    .insert(productImages)
                    .values(images.map(image => ({ productId, url: image.url, alt: image.alt })))
            }
        }

        if (specifications) {
            await db.delete(productSpecifications).where(eq(productSpecifications.productId, productId))
            if (specifications.length > 0) {
                await db
                    .insert(productSpecifications)
                    .values(specifications.map(spec => ({ productId, label: spec.label, value: spec.value })))
            }
        }

        const [updatedProduct] = await db.select().from(products).where(eq(products.id, productId)).limit(1)

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' })
        }

        const updatedDescriptions = await db
            .select({ content: productDescriptions.content })
            .from(productDescriptions)
            .where(eq(productDescriptions.productId, productId))
            .orderBy(asc(productDescriptions.sortOrder))

        const updatedColors = await db
            .select({ color: productColors.color })
            .from(productColors)
            .where(eq(productColors.productId, productId))

        const updatedImages = await db
            .select({ id: productImages.id, url: productImages.url, alt: productImages.alt })
            .from(productImages)
            .where(eq(productImages.productId, productId))

        const updatedSpecs = await db
            .select({ label: productSpecifications.label, value: productSpecifications.value })
            .from(productSpecifications)
            .where(eq(productSpecifications.productId, productId))

        return res.status(200).json({
            message: 'Product updated successfully',
            product: {
                ...updatedProduct,
                descriptions: updatedDescriptions.map(d => d.content),
                colors: updatedColors.map(c => c.color),
                images: updatedImages,
                specifications: updatedSpecs
            }
        })
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            return res.status(400).json({ error: 'Invalid input', details: error })
        }

        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

router.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const productId = Number.parseInt(id, 10)

        if (Number.isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid product ID' })
        }

        const [deletedProduct] = await db.delete(products).where(eq(products.id, productId)).returning()

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' })
        }

        return res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

export default router
