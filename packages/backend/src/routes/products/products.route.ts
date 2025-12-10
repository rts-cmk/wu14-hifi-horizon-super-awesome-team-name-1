import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { patchProductSchema, productCreateSchema, productSchema } from '@/db/schema'

const tags = ['products']

export const list = createRoute({
    path: '/products',
    method: 'get',
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(productSchema), 'The list of products'),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(z.object({ errors: z.array(z.string()) }), 'Validation error')
    }
})

export const create = createRoute({
    path: '/products',
    method: 'post',
    tags,
    security: [{ cookieAuth: [] }],
    request: {
        body: jsonContentRequired(productCreateSchema, 'The product to create')
    },
    responses: {
        [HttpStatusCodes.CREATED]: jsonContent(productSchema, 'The created product'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(productCreateSchema), 'Validation error')
    }
})

export const getOne = createRoute({
    path: '/products/{id}',
    method: 'get',
    tags,
    request: {
        params: z.object({
            id: z.coerce.number().openapi({
                param: {
                    name: 'id',
                    in: 'path',
                    required: true
                },
                example: 42
            })
        })
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(productSchema, 'The requested product'),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(z.object({ message: z.string() }), 'Product not found'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(z.object({ id: z.coerce.number() })),
            'Invalid id validation error'
        )
    }
})

export const patch = createRoute({
    path: '/products/{id}',
    method: 'patch',
    tags,
    security: [{ cookieAuth: [] }],
    request: {
        params: z.object({
            id: z.coerce.number().openapi({
                param: {
                    name: 'id',
                    in: 'path',
                    required: true
                },
                example: 42
            })
        }),
        body: jsonContentRequired(patchProductSchema, 'The product updates')
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(productSchema, 'The updated product'),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(z.object({ message: z.string() }), 'Product not found'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(patchProductSchema).or(createErrorSchema(z.object({ id: z.coerce.number() }))),
            'Validation error'
        )
    }
})

export const remove = createRoute({
    path: '/products/{id}',
    method: 'delete',
    tags,
    security: [{ cookieAuth: [] }],
    request: {
        params: z.object({
            id: z.coerce.number().openapi({
                param: {
                    name: 'id',
                    in: 'path',
                    required: true
                },
                example: 42
            })
        })
    },
    responses: {
        [HttpStatusCodes.NO_CONTENT]: {
            description: 'Product deleted'
        },
        [HttpStatusCodes.NOT_FOUND]: jsonContent(z.object({ message: z.string() }), 'Product not found'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(z.object({ id: z.coerce.number() })),
            'Invalid id validation error'
        )
    }
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
