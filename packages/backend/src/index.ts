import { serve } from "@hono/node-server";
import app from "@/app";
import env from "@/env";

console.log(`server is running on port ${env.PORT}`);

serve({
	fetch: app.fetch,
	port: env.PORT,
});
