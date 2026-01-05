import type { z } from 'zod'
import { AppError } from './errors'

export const validate = <T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> => {
    const result = schema.safeParse(data)
    if (!result.success) {
        throw new AppError('Validation failed', 400, result.error.format())
    }
    return result.data
}

export { validate as check }
