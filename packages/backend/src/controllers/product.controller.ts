import type { Request, Response } from 'express'
import { productCreateSchema, productUpdateWithRelationsSchema } from '@/db/schema'
import { productService } from '@/services/product.service'

export class ProductController {
    async getAll(_req: Request, res: Response) {
        try {
            const products = await productService.getAllProducts()

            const formattedProducts = products.map(product => ({
                ...product,
                descriptions: product.descriptions.map(d => d.content),
                colors: product.colors.map(c => c.color)
            }))

            return res.status(200).json(formattedProducts)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getPaginated(req: Request, res: Response) {
        try {
            const page = Math.max(1, parseInt(req.query.page as string) || 1);
            const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 9));

            const result = await productService.getPaginatedProducts(page, limit);

            const formattedProducts = result.products.map(product => ({
                ...product,
                descriptions: product.descriptions.map(d => d.content),
                colors: product.colors.map(c => c.color)
            }));

            return res.status(200).json({
                products: formattedProducts,
                pagination: {
                    page: result.page,
                    totalPages: result.totalPages,
                    total: result.total,
                    hasNext: result.hasNext,
                    hasPrev: result.hasPrev
                }
            });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params
            const productId = Number.parseInt(id, 10)

            if (Number.isNaN(productId)) {
                return res.status(400).json({ error: 'Invalid product ID' })
            }

            const product = await productService.getProductById(productId)

            if (!product) {
                return res.status(404).json({ error: 'Product not found' })
            }

            const formattedProduct = {
                ...product,
                descriptions: product.descriptions.map(d => d.content),
                colors: product.colors.map(c => c.color)
            }

            return res.status(200).json(formattedProduct)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const validatedData = productCreateSchema.parse(req.body)
            const newProduct = await productService.createProduct(validatedData)

            const formattedProduct = {
                ...newProduct,
                descriptions: newProduct?.descriptions.map(d => d.content) || [],
                colors: newProduct?.colors.map(c => c.color) || []
            }

            return res.status(201).json({
                message: 'Product created successfully',
                product: formattedProduct
            })
        } catch (error) {
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({ error: 'Invalid input', details: error })
            }
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const productId = Number.parseInt(id, 10)

            if (Number.isNaN(productId)) {
                return res.status(400).json({ error: 'Invalid product ID' })
            }

            const validatedData = productUpdateWithRelationsSchema.parse(req.body)
            const updatedProduct = await productService.updateProduct(productId, validatedData)

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' })
            }

            const formattedProduct = {
                ...updatedProduct,
                descriptions: updatedProduct.descriptions.map(d => d.content),
                colors: updatedProduct.colors.map(c => c.color)
            }

            return res.status(200).json({
                message: 'Product updated successfully',
                product: formattedProduct
            })
        } catch (error) {
            if (error instanceof Error && error.name === 'ZodError') {
                return res.status(400).json({ error: 'Invalid input', details: error })
            }
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const productId = Number.parseInt(id, 10)

            if (Number.isNaN(productId)) {
                return res.status(400).json({ error: 'Invalid product ID' })
            }

            const deletedProduct = await productService.deleteProduct(productId)

            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' })
            }

            return res.status(200).json({ message: 'Product deleted successfully' })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}

export const productController = new ProductController()
