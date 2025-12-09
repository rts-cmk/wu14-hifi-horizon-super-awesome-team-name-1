import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";

import indexRoute from "@/routes/index.route";

const routes = [indexRoute];

const app = configureOpenAPI(createApp());

routes.forEach((route) => {
	app.route("/", route);
});

export default app;