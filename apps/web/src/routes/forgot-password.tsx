import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="min-h-[calc(100vh-4rem)] w-full max-w-6xl px-4 pb-20 md:p-4 mx-auto">
			<h1 className="text-4xl text-[#495464] font-semibold py-10 uppercase">
				Forgot Your Password?
			</h1>

			<section className="bg-white p-8 space-y-6 shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)]">
				<h2 className="text-2xl text-black font-semibold uppercase">
					Password Reset
				</h2>
				<p className="text-lg text-gray-700">
					For security reasons, password resets are currently handled manually
					by our support team.
				</p>
				<p className="text-lg text-gray-700">
					Please contact our customer support at{" "}
					<a
						href="mailto:support@hifi-horizon.com"
						className="text-orange-500 font-bold hover:underline"
					>
						support@hifi-horizon.com
					</a>{" "}
					with your account details, and we will assist you as soon as possible.
				</p>

				<div className="pt-8">
					<Link
						to="/login"
						className="bg-orange-500 text-white py-3 px-10 hover:bg-orange-600 transition-colors inline-block"
					>
						Back to Login
					</Link>
				</div>
			</section>
		</main>
	);
}
