import type { AppOpenAPI } from "@/lib/types";
import packageJson from "../../package.json"

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc("/doc", {
        openapi: "3.0.0",
        info: {
            version: packageJson.version,
            title: "Wu14 Hifi Horizon Super Awesome Team Name 1 API",
        }
    })
    return app;
}