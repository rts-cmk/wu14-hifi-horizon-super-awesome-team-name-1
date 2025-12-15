import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
	component: RouteComponent,
	beforeLoad: async () => {
		const response = await fetch("/api/auth/check", { credentials: "include" });
		if (!response.ok) {
			throw redirect({ to: "/login" });
		}
	},
});

function RouteComponent() {
	return <div>Hello "/profile/"!</div>;
}
