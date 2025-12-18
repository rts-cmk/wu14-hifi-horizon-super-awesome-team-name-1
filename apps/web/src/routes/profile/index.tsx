import { zodResolver } from "@hookform/resolvers/zod";
import {
	createFileRoute,
	redirect,
	useLoaderData,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import {
	Lock,
	type LucideIcon,
	Mail,
	MapPin,
	Pencil,
	Phone,
	User,
	X,
} from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { Heading, Text } from "@/components/ui/typography";

const profileSchema = z
	.object({
		fullName: z
			.string()
			.min(2, "Full name must be at least 2 characters")
			.optional(),
		phone: z.string().optional(),
		email: z.email("Please enter a valid email address").optional(),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.optional(),
		confirmPassword: z.string().optional(),
		address: z
			.string()
			.min(5, "Address must be at least 5 characters")
			.optional(),
		address2: z.string().optional(),
		city: z.string().min(1, "City is required").optional(),
		zipCode: z.string().min(1, "Zip code is required").optional(),
		country: z.string().min(1, "Country is required").optional(),
	})
	.refine(
		(data) => {
			if (data.password && data.password !== data.confirmPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Passwords do not match",
			path: ["confirmPassword"],
		},
	);

type ProfileFormValues = z.infer<typeof profileSchema>;

export const Route = createFileRoute("/profile/")({
	component: RouteComponent,
	loader: async () => {
		const response = await fetch("/api/me", { credentials: "include" });
		if (!response.ok) {
			throw redirect({ to: "/login" });
		}
		const data = await response.json();
		return data.user;
	},
});

interface EditDialogProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	onSave: () => void;
	isLoading: boolean;
}

function EditDialog({
	isOpen,
	onClose,
	title,
	children,
	onSave,
	isLoading,
}: EditDialogProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="bg-white w-full max-w-xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
				<div className="p-6 border-b border-gray-100 flex items-center justify-between">
					<Heading
						variant="h3"
						className="text-lg font-bold uppercase tracking-wider"
					>
						{title}
					</Heading>
					<button
						type="button"
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors"
					>
						<X className="size-5 text-gray-500" />
					</button>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSave();
					}}
				>
					<div className="p-8 space-y-6">{children}</div>
					<div className="p-6 border-t border-gray-100 flex justify-end gap-3">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Saving..." : "Save Changes"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

function ProfileItem({
	icon: Icon,
	label,
	value,
	onEdit,
	isMultiline = false,
}: {
	icon: LucideIcon;
	label: string;
	value: string | string[] | null | undefined;
	onEdit: () => void;
	isMultiline?: boolean;
}) {
	return (
		<div className="flex items-center justify-between py-6 first:pt-0 last:pb-0">
			<div className="flex items-start gap-6">
				<div className="mt-1">
					<Icon className="size-8 text-black" />
				</div>
				<div className="space-y-1">
					<Text className="font-bold text-black">{label}</Text>
					{isMultiline && Array.isArray(value) ? (
						value.map((line) => (
							<Text key={line} className="text-gray-600 leading-tight">
								{line}
							</Text>
						))
					) : (
						<Text className="text-gray-600">
							{(value as string) || "Not provided"}
						</Text>
					)}
				</div>
			</div>
			<Button
				variant="outline"
				size="icon"
				className="size-10 rounded-sm border-gray-200 shadow-sm"
				onClick={onEdit}
			>
				<Pencil className="size-4 text-gray-600" />
			</Button>
		</div>
	);
}

function RouteComponent() {
	const navigate = useNavigate();
	const router = useRouter();
	const user = useLoaderData({ from: "/profile/" });

	const [editingField, setEditingField] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
	});

	React.useEffect(() => {
		if (editingField === "name") setValue("fullName", user.fullName);
		if (editingField === "phone") setValue("phone", user.phone || "");
		if (editingField === "mail") setValue("email", user.email);
		if (editingField === "address") {
			setValue("address", user.address);
			setValue("address2", user.address2 || "");
			setValue("city", user.city || "");
			setValue("zipCode", user.zipCode || "");
			setValue("country", user.country || "");
		}
		if (editingField === "password") {
			setValue("password", "");
			setValue("confirmPassword", "");
		}
	}, [editingField, user, setValue]);

	const tabs = [
		{ id: "profile", label: "Profile" },
		{ id: "orders", label: "Orders" },
	];

	const handleTabChange = (id: string) => {
		if (id === "orders") {
			navigate({ to: "/profile/orders" });
		}
	};

	const onSubmit = async (data: ProfileFormValues) => {
		setIsLoading(true);

		try {
			const res = await fetch("/api/me", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error("Failed to update profile");

			await router.invalidate();
			toast.success("Profile updated successfully");
			setEditingField(null);
			reset();
		} catch (err) {
			console.error(err);
			toast.error("Failed to save changes. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const addressLines = [
		user.address,
		user.address2,
		user.zipCode,
		user.city,
		user.country,
	].filter(Boolean) as string[];

	return (
		<main className="min-h-screen w-full bg-[#E8E8E8]/30 px-4 md:px-8 py-12 md:py-24">
			<div className="max-w-6xl mx-auto bg-white border border-gray-100 shadow-sm overflow-hidden">
				<Tabs
					tabs={tabs}
					activeTab="profile"
					onTabChange={handleTabChange}
					variant="pills"
				/>

				<div className="p-8 md:p-12">
					<Heading
						variant="h2"
						className="text-lg font-bold uppercase tracking-wider mb-12"
					>
						Your Profile Information
					</Heading>

					<div className="divide-y divide-gray-100">
						<ProfileItem
							icon={User}
							label="Name"
							value={user.fullName}
							onEdit={() => setEditingField("name")}
						/>
						<ProfileItem
							icon={Phone}
							label="Phone number"
							value={user.phone}
							onEdit={() => setEditingField("phone")}
						/>
						<ProfileItem
							icon={Mail}
							label="Mail"
							value={user.email}
							onEdit={() => setEditingField("mail")}
						/>
						<ProfileItem
							icon={Lock}
							label="Password"
							value="**********"
							onEdit={() => setEditingField("password")}
						/>
						<ProfileItem
							icon={MapPin}
							label="Address"
							isMultiline
							value={addressLines.length > 0 ? addressLines : "Not provided"}
							onEdit={() => setEditingField("address")}
						/>
					</div>
				</div>
			</div>

			<EditDialog
				isOpen={!!editingField}
				onClose={() => setEditingField(null)}
				title={`Edit ${editingField}`}
				onSave={handleSubmit(onSubmit)}
				isLoading={isLoading}
			>
				{editingField === "name" && (
					<Input
						label="Full Name"
						error={errors.fullName?.message}
						{...register("fullName")}
						requiredIndicator
					/>
				)}
				{editingField === "phone" && (
					<Input
						label="Phone Number"
						error={errors.phone?.message}
						{...register("phone")}
					/>
				)}
				{editingField === "mail" && (
					<Input
						label="Email"
						type="email"
						error={errors.email?.message}
						{...register("email")}
						requiredIndicator
					/>
				)}
				{editingField === "password" && (
					<div className="space-y-4">
						<Input
							label="New Password"
							type="password"
							error={errors.password?.message}
							{...register("password")}
							requiredIndicator
						/>
						<Input
							label="Confirm Password"
							type="password"
							error={errors.confirmPassword?.message}
							{...register("confirmPassword")}
							requiredIndicator
						/>
					</div>
				)}
				{editingField === "address" && (
					<div className="space-y-4">
						<Input
							label="Street Address"
							error={errors.address?.message}
							{...register("address")}
							requiredIndicator
						/>
						<Input
							label="Apartment, suite, etc."
							error={errors.address2?.message}
							{...register("address2")}
						/>
						<div className="grid grid-cols-2 gap-4">
							<Input
								label="City"
								error={errors.city?.message}
								{...register("city")}
								requiredIndicator
							/>
							<Input
								label="Zip Code"
								error={errors.zipCode?.message}
								{...register("zipCode")}
								requiredIndicator
							/>
						</div>
						<Input
							label="Country"
							error={errors.country?.message}
							{...register("country")}
							requiredIndicator
						/>
					</div>
				)}
			</EditDialog>
		</main>
	);
}
