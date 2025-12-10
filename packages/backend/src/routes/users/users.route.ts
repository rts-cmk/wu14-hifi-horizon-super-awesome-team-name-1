import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema } from 'stoker/openapi/schemas'
import { userInsertSchema, userSchema } from '@/db/schema'

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

export type RegisterRoute = typeof register
