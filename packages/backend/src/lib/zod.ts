import { z } from "zod";

export function toZodSchema<T extends z.ZodTypeAny>(
  schema: T,
) {
  return schema;
}
