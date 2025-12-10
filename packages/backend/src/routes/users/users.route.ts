import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { loginSchema, userInsertSchema, userSchema } from '@/db/schema'

const tags = ['users']

export const register = createRoute({
    path: '/users/register',
    method: 'post',
    tags,
    request: {
        body: jsonContentRequired(userInsertSchema, 'The user to register')
    },
    responses: {
        [HttpStatusCodes.CREATED]: jsonContent(userSchema, 'The registered user'),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(userInsertSchema), 'Validation error')
    }
})

export const login = createRoute({
    path: '/users/login',
    method: 'post',
    tags,
    request: {
        body: jsonContentRequired(loginSchema, 'The user credentials')
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({
                token: z.string()
            }),
            'The login token'
        ),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
            z.object({
                message: z.string()
            }),
            'Invalid credentials'
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(loginSchema), 'Validation error')
    }
})

export const me = createRoute({
    path: '/users/me',
    method: 'get',
    tags,
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(userSchema, 'The current user'),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
            z.object({
                message: z.string()
            }),
            'Unauthorized'
        )
    }
})

export type RegisterRoute = typeof register
export type LoginRoute = typeof login
export type MeRoute = typeof me
