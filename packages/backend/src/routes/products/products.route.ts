import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { productSchema } from "@/db/schema";

export const list = createRoute({
    path: "/products",
    method: "get",
    tags: ["products"],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(productSchema),
            "The list of products"
        ),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(
            z.record(z.string(), z.unknown()),
            "Validation error"
        )
    }
})

export type ListRoute = typeof list;
