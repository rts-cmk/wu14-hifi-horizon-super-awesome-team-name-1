import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
	component: RouteComponent,
});

function RouteComponent() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.target as HTMLFormElement);
		const formData = Object.fromEntries(data.entries());

		try {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				throw new Error((await res.text()) || "Failed to register");
			}

			alert("Account created successfully");
			(e.target as HTMLFormElement).reset();
		} catch (err) {
			console.error("Registration error:", err);
			alert(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
		}
	};

	return (
		<main className="min-h-[calc(100vh-4rem)] w-full max-w-6xl px-4 pb-20 md:p-4 mx-auto">
			<h1 className="text-4xl text-[#495464] font-semibold py-10 uppercase">
				Get in touch with us
			</h1>

			<form
				className="bg-white p-8 space-y-1 text-balance shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)]"
				id="contact-form"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl text-black font-semibold mb-6 uppercase">
					Create new customer account
				</h2>
				<label
					htmlFor="full-name"
					className="flex items-center gap-1 text-lg font-medium text-gray-700"
				>
					Full Name
					<span className="text-sm text-orange-500 font-semibold">*</span>
				</label>
				<input
					id="full-name"
					name="fullName"
					type="text"
					required
					className="bg-[#E8E8E8] py-3 w-full md:w-3xl px-4 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]"
				/>

				<label
					htmlFor="email"
					className="flex items-center gap-1 text-lg font-medium text-gray-700 mt-4"
				>
					Address
					<span className="text-sm text-orange-500 font-semibold">*</span>
				</label>
				<input
					id="address"
					name="address"
					type="text"
					required
					className="bg-[#E8E8E8] py-3 w-full md:w-3xl px-4 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]"
				/>

				<label
					htmlFor="address2"
					className="flex items-center gap-1 text-lg font-medium text-gray-700 mt-4"
				>
					Address - line 2
				</label>
				<input
					id="address2"
					name="address2"
					className="bg-[#E8E8E8] py-3 w-full md:w-3xl px-4 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]"
				/>

				<div className="flex gap-4 justify-between max-w-3xl">
					<div className="flex flex-col w-full">
						<label
							htmlFor="country"
							className="flex items-center gap-1 text-lg font-medium text-gray-700 mt-4"
						>
							Country
						</label>
						<input
							id="country"
							name="country"
							type="text"
							className="bg-[#E8E8E8] py-3 w-full px-4 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]"
						/>
					</div>

					<div className="flex flex-col w-full">
						<label
							htmlFor="phoneNo"
							className="flex items-center gap-1 text-lg font-medium text-gray-700 mt-4"
						>
							Phone no.
						</label>
						<input
							id="phoneNo"
							name="phoneNo"
							type="text"
							className="bg-[#E8E8E8] py-3 w-full px-4 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]"
						/>
					</div>
				</div>

				<label
					htmlFor="email"
					className="flex items-center gap-1 text-lg font-medium text-gray-700 mt-4"
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

				<label
					htmlFor="password"
					className="flex items-center gap-1 text-lg font-medium text-gray-700 mt-4"
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

				<label
					htmlFor="repeat-password"
					className="flex items-center gap-1 text-lg font-medium text-gray-700 mt-4"
				>
					Repeat password
					<span className="text-sm text-orange-500 font-semibold">*</span>
				</label>

				<input
					id="repeat-password"
					name="repeatPassword"
					type="password"
					required
					className="bg-[#E8E8E8] py-3 w-full md:w-3xl px-4 shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)]"
				/>

				<div className="flex flex-col mt-6">
					<div>
						<input
							type="checkbox"
							id="storageConsent"
							name="storageConsent"
							required
						/>
						<label htmlFor="storageConsent" className="text-gray-700 ml-2">
							By using this form you agree with the storage and handling of your
							data by this website.
							<span className="text-sm text-orange-500 font-semibold">*</span>
						</label>
					</div>

					<div>
						<input
							type="checkbox"
							id="newsletterConsent"
							name="newsletterConsent"
							required
						/>
						<label htmlFor="newsletterConsent" className="text-gray-700 ml-2">
							Accept marketing from HiFi Horizon (newsletter and discount offers
							by email).
							<span className="text-sm text-orange-500 font-semibold">*</span>
						</label>
					</div>
				</div>

				<button
					type="submit"
					className="mt-6 bg-orange-500 text-white py-3 px-6 hover:bg-orange-600 transition-all w-fit"
				>
					Create an Account
				</button>
			</form>
		</main>
	);
}
