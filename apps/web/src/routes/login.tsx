import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
	rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	useEffect(() => {
		const rememberedEmail = localStorage.getItem("rememberedEmail");
		if (rememberedEmail) {
			setValue("email", rememberedEmail);
			setValue("rememberMe", true);
		}
	}, [setValue]);

	const onSubmit = async (data: LoginFormValues) => {
		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				throw new Error((await res.text()) || "Failed to log in");
			}

			if (data.rememberMe) {
				localStorage.setItem("rememberedEmail", data.email);
			} else {
				localStorage.removeItem("rememberedEmail");
			}

			toast.success("Logged in successfully");
			// maybe redirect, e.g., to profile or index page
		} catch (err) {
			console.error("Login error:", err);
			toast.error(
				`Error: ${err instanceof Error ? err.message : "Unknown error"}`,
			);
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
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className="text-2xl text-black font-semibold mb-6 uppercase">
					Registered customers
				</h2>
				<p>If you have an account, sign in with your email address.</p>

				<div className="mt-12 space-y-6">
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
				</div>

				<div className="flex items-center mt-6">
					<input
						type="checkbox"
						id="remember-me"
						{...register("rememberMe")}
						className="w-4 h-4 cursor-pointer"
					/>
					<label
						htmlFor="remember-me"
						className="ml-2 text-gray-700 cursor-pointer"
					>
						Remember me
					</label>
				</div>

				<div className="mt-8">
					<button
						type="submit"
						className="bg-orange-500 text-white py-3 px-10 hover:bg-orange-600 transition-colors cursor-pointer"
					>
						Sign in
					</button>
				</div>

				<Link to="/forgot-password" title="Forgot Password">
					<p className="mt-4 hover:underline text-orange-500 cursor-pointer">
						Forgot your Password?
					</p>
				</Link>
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
								type="button"
								className="bg-orange-500 text-white py-2 px-8 rounded-xs w-full sm:w-auto cursor-pointer"
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
