import * as HttpStatusCodes from 'stoker/http-status-codes'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import db from '@/db'
import { productSchema, products } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from './products.route'

export const list: AppRouteHandler<ListRoute> = async c => {
    const data = await db.query.products.findMany({
        with: { images: true }
    })
    return c.json(z.array(productSchema).parse(data), HttpStatusCodes.OK)
}

export const create: AppRouteHandler<CreateRoute> = async c => {
    const data = c.req.valid('json')
    const [product] = await db.insert(products).values(data).returning()

    const productWithImages = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, product.id),
        with: { images: true }
    })

    return c.json(productSchema.parse(productWithImages), HttpStatusCodes.CREATED)
}

export const getOne: AppRouteHandler<GetOneRoute> = async c => {
    const { id } = c.req.valid('param')
    const product = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, id),
        with: { images: true }
    })

    if (!product) {
        return c.json({ message: 'Product not found' }, HttpStatusCodes.NOT_FOUND)
    }

    return c.json(productSchema.parse(product), HttpStatusCodes.OK)
}

export const patch: AppRouteHandler<PatchRoute> = async c => {
    const { id } = c.req.valid('param')
    const updates = c.req.valid('json')

    const [product] = await db.update(products).set(updates).where(eq(products.id, id)).returning()

    if (!product) {
        return c.json({ message: 'Product not found' }, HttpStatusCodes.NOT_FOUND)
    }

    const productWithImages = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, product.id),
        with: { images: true }
    })

    return c.json(productSchema.parse(productWithImages), HttpStatusCodes.OK)
}

export const remove: AppRouteHandler<RemoveRoute> = async c => {
    const { id } = c.req.valid('param')
    const deleted = await db.delete(products).where(eq(products.id, id)).returning()

    if (deleted.length === 0) {
        return c.json({ message: 'Product not found' }, HttpStatusCodes.NOT_FOUND)
    }

    return c.body(null, HttpStatusCodes.NO_CONTENT)
}
