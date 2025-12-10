import { AppRouteHandler } from "@/lib/types";
import { ListRoute } from "./products.route";
import db from "@/db";
import { products, productSchema } from "@/db/schema";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { z } from "zod";

const schema = z.array(productSchema);

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const data = await db.select().from(products);
  const result = schema.safeParse(data);
  if (!result.success) {
    return c.json(result.error.format(), HttpStatusCodes.BAD_REQUEST);
  }
  return c.json(result.data, HttpStatusCodes.OK);
}
