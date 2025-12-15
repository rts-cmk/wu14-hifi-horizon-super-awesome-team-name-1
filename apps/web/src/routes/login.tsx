import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.target as HTMLFormElement);
		const formData = Object.fromEntries(data.entries());

		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error((await res.text()) || "Failed to log in");
			}

			alert("Login successful");
			(e.target as HTMLFormElement).reset();
		} catch (err) {
			console.error("Login error:", err);
			alert(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
		}
	};

	return (
		<main className="min-h-[calc(100vh-4rem)] w-full max-w-6xl px-4 pb-20 md:p-4 mx-auto">
			<h1 className="text-4xl text-[#495464] font-semibold py-10 uppercase">
				Login
			</h1>

			<form
				className="bg-white p-8 space-y-1 text-balance shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)]"
				id="contact-form"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl text-black font-semibold mb-6 uppercase">
					Registered customers
				</h2>
				<p>If you have an account, sign in with your email address.</p>

				<div className="mt-12 space-y-6">
					<div>
						<label
							htmlFor="email"
							className="flex items-center gap-1 text-lg font-medium text-gray-700"
						>
							Email
							<span className="text-sm text-orange-500 font-semibold">*</span>
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className="bg-[#E8E8E8] py-3 w-full md:w-3xl px-4 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="flex items-center gap-1 text-lg font-medium text-gray-700"
						>
							Password
							<span className="text-sm text-orange-500 font-semibold">*</span>
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							className="bg-[#E8E8E8] py-3 w-full md:w-3xl px-4 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]"
						/>
					</div>
				</div>

				<input type="checkbox" id="remember-me" className="mt-6" />
				<label htmlFor="remember-me" className="ml-2 text-gray-700">
					Remember me
				</label>

				<div className="mt-8">
					<button
						type="submit"
						className="bg-orange-500 text-white py-3 px-10 hover:bg-orange-600 transition-colors"
					>
						Sign in
					</button>
				</div>

				<p className="mt-4">Forgot your Password?</p>
			</form>

			<section className="w-full py-16">
				<div>
					<div className="bg-white p-8 text-center">
						<h2 className="text-2xl font-bold uppercase text-black mb-4">
							new customer
						</h2>
						<p className="text-black text-base mb-6">
							Creating an account has many benefits: check out faster, track
							orders and more.
						</p>
						<div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
							<button
								type="submit"
								className="bg-orange-500 text-white py-2 px-8 rounded-xs w-full sm:w-auto"
							>
								<Link to="/register" className="text-white">
									Create an Account
								</Link>
							</button>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
