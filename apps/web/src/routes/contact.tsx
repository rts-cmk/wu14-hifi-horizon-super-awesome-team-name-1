import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
	fullName: z.string().min(2, "Full name must be at least 2 characters"),
	email: z.email("Please enter a valid email address"),
	subject: z.string().min(3, "Subject must be at least 3 characters"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const Route = createFileRoute("/contact")({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			fullName: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	const onSubmit = async (data: ContactFormValues) => {
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to submit form");
			}

			toast.success("Message sent successfully");
			reset();
		} catch (error) {
			console.error("error submitting form:", error);
			toast.error(
				`Error: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	};

	return (
		<main className="min-h-[calc(100vh-4rem)] w-full max-w-6xl p-4 md:p-0 mx-auto">
			<h1 className="text-4xl text-[#495464] font-semibold py-10 uppercase">
				Get in touch with us
			</h1>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white p-8 space-y-6 text-balance shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)]"
				id="contact-form"
			>
				<Input
					label="Full Name"
					requiredIndicator
					placeholder="Full name"
					{...register("fullName")}
					error={errors.fullName?.message}
				/>

				<Input
					label="Email"
					requiredIndicator
					type="email"
					placeholder="Email"
					{...register("email")}
					error={errors.email?.message}
				/>

				<Input
					label="Subject"
					requiredIndicator
					placeholder="Subject"
					{...register("subject")}
					error={errors.subject?.message}
				/>

				<Textarea
					label="Message"
					requiredIndicator
					placeholder="Your message..."
					{...register("message")}
					error={errors.message?.message}
					className="h-40"
				/>

				<div className="flex justify-end py-8">
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-orange-500 text-white py-2 px-4 rounded-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>

			<p className="md:flex text-xl justify-center mt-10 mb-20 px-4">
				Visit our sister companies&nbsp;
				<span className="text-orange-500">Home Sound</span>&nbsp;and&nbsp;
				<span className="text-orange-500">The Movie Rooms</span>&nbsp;part of
				the HiFi Horizon Group.
			</p>
		</main>
	);
}
