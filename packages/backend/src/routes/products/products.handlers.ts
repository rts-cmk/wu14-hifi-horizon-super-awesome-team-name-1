import * as HttpStatusCodes from 'stoker/http-status-codes'
import { z } from 'zod'
import db from '@/db'
import { productSchema, products } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import type { CreateRoute, ListRoute } from './products.route'

export const list: AppRouteHandler<ListRoute> = async c => {
    const data = await db.select().from(products)
    return c.json(z.array(productSchema).parse(data), HttpStatusCodes.OK)
}

export const create: AppRouteHandler<CreateRoute> = async c => {
    const data = await c.req.valid('json')
    const [product] = await db.insert(products).values(data).returning()
    return c.json(productSchema.parse(product), HttpStatusCodes.CREATED)
}
