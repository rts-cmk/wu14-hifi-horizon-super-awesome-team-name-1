import { Hono } from "hono";
import { logger } from "hono/logger";
import { notFound, onError } from "stoker/middlewares";

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
    return c.json({ message: "Hello Hono!" });
});

app.notFound(notFound);
app.onError(onError);

export default app;