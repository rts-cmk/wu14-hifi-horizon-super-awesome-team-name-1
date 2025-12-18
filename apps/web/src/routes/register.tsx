import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const registerSchema = z
	.object({
		fullName: z.string().min(2, "Full name must be at least 2 characters"),
		address: z.string().min(5, "Address must be at least 5 characters"),
		address2: z.string().optional(),
		country: z.string().min(1, "Country is required"),
		phoneNo: z.string().min(5, "Phone number is required"),
		email: z.string().email("Please enter a valid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		repeatPassword: z.string(),
		storageConsent: z.boolean().refine((val) => val === true, {
			message: "You must agree to data storage",
		}),
		newsletterConsent: z.boolean().refine((val) => val === true, {
			message: "You must accept marketing to continue",
		}),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: "Passwords do not match",
		path: ["repeatPassword"],
	});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const Route = createFileRoute("/register")({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			address2: "",
			storageConsent: false,
			newsletterConsent: false,
		},
	});

	const onSubmit = async (data: RegisterFormValues) => {
		try {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				throw new Error((await res.text()) || "Failed to register");
			}

			toast.success("Account created successfully");
			reset();
		} catch (err) {
			console.error("Registration error:", err);
			toast.error(
				`Error: ${err instanceof Error ? err.message : "Unknown error"}`,
			);
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
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className="text-2xl text-black font-semibold mb-6 uppercase">
					Create new customer account
				</h2>

				<div className="space-y-4">
					<Input
						label="Full Name"
						requiredIndicator
						error={errors.fullName?.message}
						{...register("fullName")}
					/>

					<Input
						label="Address"
						requiredIndicator
						error={errors.address?.message}
						{...register("address")}
					/>

					<Input
						label="Address - line 2"
						error={errors.address2?.message}
						{...register("address2")}
					/>

					<div className="flex gap-4 justify-between max-w-3xl">
						<Input
							label="Country"
							requiredIndicator
							error={errors.country?.message}
							{...register("country")}
						/>

						<Input
							label="Phone no."
							requiredIndicator
							error={errors.phoneNo?.message}
							{...register("phoneNo")}
						/>
					</div>

					<Input
						label="Email"
						requiredIndicator
						type="email"
						error={errors.email?.message}
						{...register("email")}
					/>

					<Input
						label="Password"
						requiredIndicator
						type="password"
						error={errors.password?.message}
						{...register("password")}
					/>

					<Input
						label="Repeat password"
						requiredIndicator
						type="password"
						error={errors.repeatPassword?.message}
						{...register("repeatPassword")}
					/>
				</div>

				<div className="flex flex-col mt-6 gap-2">
					<div>
						<div className="flex items-center">
							<input
								type="checkbox"
								id="storageConsent"
								{...register("storageConsent")}
								className="w-4 h-4 cursor-pointer"
							/>
							<label
								htmlFor="storageConsent"
								className="text-gray-700 ml-2 cursor-pointer"
							>
								By using this form you agree with the storage and handling of
								your data by this website.
								<span className="text-sm text-orange-500 font-semibold">*</span>
							</label>
						</div>
						{errors.storageConsent && (
							<p className="text-red-500 text-sm mt-1">
								{errors.storageConsent.message}
							</p>
						)}
					</div>

					<div>
						<div className="flex items-center">
							<input
								type="checkbox"
								id="newsletterConsent"
								{...register("newsletterConsent")}
								className="w-4 h-4 cursor-pointer"
							/>
							<label
								htmlFor="newsletterConsent"
								className="text-gray-700 ml-2 cursor-pointer"
							>
								Accept marketing from HiFi Horizon (newsletter and discount
								offers by email).
								<span className="text-sm text-orange-500 font-semibold">*</span>
							</label>
						</div>
						{errors.newsletterConsent && (
							<p className="text-red-500 text-sm mt-1">
								{errors.newsletterConsent.message}
							</p>
						)}
					</div>
				</div>

				<button
					type="submit"
					className="mt-6 bg-orange-500 text-white py-3 px-6 hover:bg-orange-600 transition-all w-fit cursor-pointer"
				>
					Create an Account
				</button>
			</form>
		</main>
	);
}
