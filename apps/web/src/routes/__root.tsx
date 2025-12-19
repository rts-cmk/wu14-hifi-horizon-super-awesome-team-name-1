import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import { ComparisonBar } from "@/components/comparison-bar";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />
			<Toaster position="bottom-right" richColors />
			<Outlet />
			<Footer />
			<ComparisonBar />
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
