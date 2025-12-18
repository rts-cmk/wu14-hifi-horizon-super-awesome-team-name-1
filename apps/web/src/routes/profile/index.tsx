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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { Heading, Text } from "@/components/ui/typography";

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
	onSave: (e: React.FormEvent<HTMLFormElement>) => void;
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
				<form onSubmit={onSave}>
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

	const tabs = [
		{ id: "profile", label: "Profile" },
		{ id: "orders", label: "Orders" },
	];

	const handleTabChange = (id: string) => {
		if (id === "orders") {
			navigate({ to: "/profile/orders" });
		}
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());

		try {
			const res = await fetch("/api/me", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error("Failed to update profile");

			await router.invalidate();
			setEditingField(null);
		} catch (err) {
			console.error(err);
			alert("Failed to save changes. Please try again.");
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
				onSave={handleSave}
				isLoading={isLoading}
			>
				{editingField === "name" && (
					<Input
						label="Full Name"
						name="fullName"
						defaultValue={user.fullName}
						required
					/>
				)}
				{editingField === "phone" && (
					<Input
						label="Phone Number"
						name="phone"
						defaultValue={user.phone || ""}
					/>
				)}
				{editingField === "mail" && (
					<Input
						label="Email"
						name="email"
						type="email"
						defaultValue={user.email}
						required
					/>
				)}
				{editingField === "password" && (
					<div className="space-y-4">
						<Input
							label="New Password"
							name="password"
							type="password"
							required
						/>
						<Input
							label="Confirm Password"
							name="confirmPassword"
							type="password"
							required
						/>
					</div>
				)}
				{editingField === "address" && (
					<div className="space-y-4">
						<Input
							label="Street Address"
							name="address"
							defaultValue={user.address}
							required
						/>
						<Input
							label="Apartment, suite, etc."
							name="address2"
							defaultValue={user.address2 || ""}
						/>
						<div className="grid grid-cols-2 gap-4">
							<Input
								label="City"
								name="city"
								defaultValue={user.city || ""}
								required
							/>
							<Input
								label="Zip Code"
								name="zipCode"
								defaultValue={user.zipCode || ""}
								required
							/>
						</div>
						<Input
							label="Country"
							name="country"
							defaultValue={user.country || ""}
							required
						/>
					</div>
				)}
			</EditDialog>
		</main>
	);
}
