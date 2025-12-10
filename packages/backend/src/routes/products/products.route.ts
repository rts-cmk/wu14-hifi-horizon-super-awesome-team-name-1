import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { productSchema } from '@/db/schema'

export const list = createRoute({
    path: '/products',
    method: 'get',
    tags: ['products'],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(productSchema), 'The list of products'),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(z.object({ errors: z.array(z.string()) }), 'Validation error')
    }
})

export type ListRoute = typeof list
