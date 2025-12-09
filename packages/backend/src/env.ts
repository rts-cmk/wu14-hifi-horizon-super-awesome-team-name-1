import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
    PORT: z.coerce.number().default(3000)
})

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
    env = envSchema.parse(process.env);
} catch(e) {
    const error = e as z.ZodError;
    console.error("❌ invalid environment variables:", z.treeifyError(error));
    process.exit(1);
}

export default env;