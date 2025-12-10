import * as HttpStatusCodes from 'stoker/http-status-codes'
import { z } from 'zod'
import db from '@/db'
import { productSchema, products } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import type { CreateRoute, ListRoute } from './products.route'

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
