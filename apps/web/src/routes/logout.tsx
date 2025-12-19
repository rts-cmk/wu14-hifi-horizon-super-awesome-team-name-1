import {
	createFileRoute,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/logout")({
	component: LogoutComponent,
});

function LogoutComponent() {
	const navigate = useNavigate();
	const router = useRouter();

	useEffect(() => {
		const performLogout = async () => {
			try {
				const res = await fetch("/api/logout", {
					method: "POST",
				});

				if (res.ok) {
					await router.invalidate();
					toast.success("Logged out successfully");
				} else {
					console.error("Logout failed", await res.text());
					toast.error("Issue logging out, assuming logged out locally.");
				}
			} catch (error) {
				console.error("Logout error", error);
				toast.error("Error connecting to server");
			} finally {
				navigate({ to: "/" });
			}
		};

		performLogout();
	}, [navigate, router]);

	return (
		<div className="flex items-center justify-center min-h-[50vh]">
			<p className="text-xl text-gray-600">Logging out...</p>
		</div>
	);
}
