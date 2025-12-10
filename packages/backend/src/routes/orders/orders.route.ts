import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { createOrderSchema, orderSchema } from '@/db/schema'

const tags = ['orders']

export const list = createRoute({
    path: '/orders',
    method: 'get',
    tags,
    security: [{ cookieAuth: [] }],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(z.array(orderSchema), 'List of orders'),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(z.object({ message: z.string() }), 'Unauthorized')
    }
})

export const getOne = createRoute({
    path: '/orders/{id}',
    method: 'get',
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
                example: 1
            })
        })
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(orderSchema, 'The order receipt'),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(z.object({ message: z.string() }), 'Order not found'),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(z.object({ message: z.string() }), 'Unauthorized')
    }
})

export const create = createRoute({
    path: '/orders',
    method: 'post',
    tags,
    security: [{ cookieAuth: [] }],
    request: {
        body: jsonContentRequired(createOrderSchema, 'The order to place')
    },
    responses: {
        [HttpStatusCodes.CREATED]: jsonContent(orderSchema, 'The created order'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(createOrderSchema), 'Validation error'),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(z.object({ message: z.string() }), 'Unauthorized'),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(z.object({ message: z.string() }), 'Business error (e.g. stock)'),
        [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(z.object({ message: z.string() }), 'Internal error')
    }
})

export type ListRoute = typeof list
export type GetOneRoute = typeof getOne
export type CreateRoute = typeof create
