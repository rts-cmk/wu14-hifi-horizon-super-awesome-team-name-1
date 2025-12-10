import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import { jsonContent } from 'stoker/openapi/helpers'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'
import { createRouter } from '@/lib/create-app'

const router = createRouter().openapi(
    createRoute({
        method: 'get',
        path: '/',
        responses: {
            [HttpStatusCodes.OK]: jsonContent(
                createMessageObjectSchema(HttpStatusPhrases.ACCEPTED),
                HttpStatusPhrases.ACCEPTED
            )
        }
    }),
    c => {
        return c.json(
            {
                message: 'HIFI Horizon API'
            },
            HttpStatusCodes.OK
        )
    }
)

export default router
