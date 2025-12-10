import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { Schema } from 'hono'
import type { PinoLogger } from 'hono-pino'

export type AppBindings = {
    Variables: {
        logger: PinoLogger
    }
}

// biome-ignore lint/complexity/noBannedTypes: we need to allow for the schema to be empty
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>
