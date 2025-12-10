import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { productCreateSchema, productSchema } from '@/db/schema'

export const list = createRoute({
    path: '/products',
    method: 'get',
    tags: ['products'],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(productSchema), 'The list of products'),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(z.object({ errors: z.array(z.string()) }), 'Validation error')
    }
})

export const create = createRoute({
    path: '/products',
    method: 'post',
    tags: ['products'],
    request: {
        body: jsonContentRequired(productCreateSchema, 'The product to create')
    },
    responses: {
        [HttpStatusCodes.CREATED]: jsonContent(productSchema, 'The created product'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(productCreateSchema), 'Validation error')
    }
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
