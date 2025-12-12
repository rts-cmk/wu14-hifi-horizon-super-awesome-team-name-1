import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Header from "@/components/header";
import { ComparisonBar } from "@/components/ui/comparison-bar";
import { CookieBanner } from "@/components/ui/cookie-banner";

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />
			<Outlet />
			<ComparisonBar />
			<CookieBanner />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	),
});
