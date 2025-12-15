import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
	component: RouteComponent,
});

function RouteComponent() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to submit form");
			}

			// reset form on success
			setFormData({
				fullName: "",
				email: "",
				subject: "",
				message: "",
			});
		} catch (error) {
			console.error("error submitting form:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="min-h-[calc(100vh-4rem)] w-full max-w-6xl mx-auto">
			<h1 className="text-4xl text-[#495464] font-semibold py-10 uppercase">
				Get in touch with us
			</h1>

			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 space-y-1 text-balance"
				id="contact-form"
			>
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
					value={formData.fullName}
					onChange={handleChange}
					required
					className="bg-[#E8E8E8] py-3 w-full md:w-2xl px-4"
				/>

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
					value={formData.email}
					onChange={handleChange}
					required
					className="bg-[#E8E8E8] py-3 w-full md:w-2xl px-4"
				/>

				<label
					htmlFor="subject"
					className="flex items-center gap-1 text-lg font-medium text-gray-700"
				>
					Subject
					<span className="text-sm text-orange-500 font-semibold">*</span>
				</label>
				<input
					id="subject"
					name="subject"
					type="text"
					value={formData.subject}
					onChange={handleChange}
					required
					className="bg-[#E8E8E8] py-3 w-full md:w-2xl px-4"
				/>

				<label
					htmlFor="message"
					className="flex items-center gap-1 text-lg font-medium text-gray-700"
				>
					Message
					<span className="text-sm text-orange-500 font-semibold">*</span>
				</label>
				<textarea
					id="message"
					name="message"
					value={formData.message}
					onChange={handleChange}
					required
					className="bg-[#E8E8E8] py-3 px-4 resize-none w-full h-40"
				/>

				<div className="flex justify-end py-8">
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-orange-500 text-white py-2 px-4 rounded-xs disabled:opacity-50 disabled:cursor-not-allowed"
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
