import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import { ComparisonBar } from "@/components/comparison-bar";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: () => (
		<>
			<Header />
			<Toaster position="bottom-right" richColors />
			<Outlet />
			<Footer />
			<ComparisonBar />
			<ReactQueryDevtools buttonPosition="bottom-left" />
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
