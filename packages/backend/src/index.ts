import { serve } from "@hono/node-server";
import app from "@/app";

const port = 3000;
console.log(`server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
})