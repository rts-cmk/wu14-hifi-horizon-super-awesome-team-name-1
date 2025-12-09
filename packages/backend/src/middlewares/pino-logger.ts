import { pinoLogger as honoPinoLogger } from "hono-pino";
import pino from "pino";
import env from "../env";

export const pinoLogger = honoPinoLogger({
  pino: pino({
    base: null,
    level: env.LOG_LEVEL,
    ...(env.NODE_ENV === "development" && {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss.l",
          ignore: "pid,hostname",
        },
      },
    }),
    timestamp: pino.stdTimeFunctions.unixTime,
  }),
});
