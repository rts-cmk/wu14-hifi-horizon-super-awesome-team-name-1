import * as HttpStatusCodes from 'stoker/http-status-codes'
import { z } from 'zod'
import db from '@/db'
import { productSchema, products } from '@/db/schema'
import type { AppRouteHandler } from '@/lib/types'
import type { ListRoute } from './products.route'

const schema = z.array(productSchema)

export const list: AppRouteHandler<ListRoute> = async c => {
    const data = await db.select().from(products)
    const result = schema.safeParse(data)
    if (!result.success) {
        return c.json(z.treeifyError(result.error), HttpStatusCodes.BAD_REQUEST)
    }
    return c.json(result.data, HttpStatusCodes.OK)
}
