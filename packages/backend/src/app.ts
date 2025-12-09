import { Hono } from "hono";
import { requestId } from "hono/request-id";

import type { PinoLogger } from "hono-pino";

import { notFound, onError } from "stoker/middlewares";
import { pinoLogger } from "./middlewares/pino-logger";

type AppBindings = {
    Variables: {
        logger: PinoLogger
    }
}

const app = new Hono<AppBindings>();
app.use(requestId());
app.use(pinoLogger);

app.get("/", (c) => {
    return c.json({ message: "Hello Hono!" });
});

app.notFound(notFound);
app.onError(onError);

export default app;