import { zodResolver } from "@hookform/resolvers/zod";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import {
	createFileRoute,
	Link,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import * as React from "react";
import { useForm } from "react-hook-form";
import {
	FaApplePay,
	FaCcMastercard,
	FaCcPaypal,
	FaCcStripe,
	FaCcVisa,
} from "react-icons/fa";
import { SiFedex } from "react-icons/si";
import { toast } from "sonner";
import { z } from "zod";
import { CheckoutStepper } from "@/components/checkout-stepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SelectionGroup } from "@/components/ui/selection-group";
import { Heading, Text } from "@/components/ui/typography";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";

const checkoutSchema = z.object({
	fullName: z.string().min(2, "Full name must be at least 2 characters"),
	zipCode: z.string().min(2, "Zip code is required"),
	city: z.string().min(1, "City is required"),
	address: z.string().min(5, "Address must be at least 5 characters"),
	email: z.string().email("Please enter a valid email address"),
	phone: z.string().min(5, "Phone number is required"),
	newsletter: z.boolean().optional(),
	terms: z.boolean().refine((val) => val === true, {
		message: "You must accept the terms to proceed",
	}),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const userQueryOptions = queryOptions({
	queryKey: ["me"],
	queryFn: async () => {
		const response = await fetch("/api/me", { credentials: "include" });
		if (response.ok) {
			const data = await response.json();
			return data.user;
		}
		return null;
	},
});

export const Route = createFileRoute("/payment")({
	component: PaymentComponent,
	beforeLoad: () => {
		const { items } = useCartStore.getState();
		if (items.length === 0) {
			throw redirect({ to: "/cart" });
		}
	},
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(userQueryOptions),
});

function PaymentComponent() {
	const { data: user } = useSuspenseQuery(userQueryOptions);
	const navigate = useNavigate();
	const { items, total, clearCart } = useCartStore();
	const {
		formData: storeData,
		deliveryMethod,
		paymentMethod,
		setFormData: setStoreData,
		setDeliveryMethod,
		setPaymentMethod,
	} = useCheckoutStore();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			fullName: storeData.fullName || user?.fullName || "",
			zipCode: storeData.zipCode || user?.zipCode || "",
			city: storeData.city || user?.city || "",
			address: storeData.address || user?.address || "",
			email: storeData.email || user?.email || "",
			phone: storeData.phone || user?.phone || "",
			newsletter: storeData.newsletter || false,
			terms: storeData.terms || false,
		},
	});

	const formValues = watch();

	React.useEffect(() => {
		const subscription = watch((value) => {
			setStoreData(value as Partial<CheckoutFormValues>);
		});
		return () => subscription.unsubscribe();
	}, [watch, setStoreData]);

	const onCheckout = async () => {
		try {
			const orderItems = items.map((item) => ({
				productId: item.id,
				quantity: item.quantity,
				price: item.price,
			}));

			const response = await fetch("/api/orders", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ items: orderItems }),
				credentials: "include",
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to place order");
			}

			toast.success("Order placed successfully!");
			clearCart();
			navigate({ to: "/profile/orders" });
		} catch (error: unknown) {
			console.error("Checkout error:", error);
			const errorMessage =
				error instanceof Error
					? error.message
					: "An error occurred during checkout. Please try again.";
			toast.error(errorMessage);
		}
	};

	const subTotal = total();
	const deliveryCost = 4;
	const grandTotal = subTotal + deliveryCost;
	const calculatedVat = subTotal * 0.2;

	return (
		<main className="min-h-screen w-full bg-[#F5F5F5] pt-10 pb-20">
			<div className="max-w-7xl mx-auto px-4">
				<CheckoutStepper currentStep="payment" />

				<Heading variant="h1" className="text-3xl font-bold mb-8">
					Your info
				</Heading>

				<form onSubmit={handleSubmit(onCheckout)}>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-8">
							<Card padding="lg">
								<div className="space-y-4">
									<Input
										id="fullName"
										label="Full name"
										requiredIndicator
										error={errors.fullName?.message}
										{...register("fullName")}
									/>

									<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
										<div className="sm:col-span-1">
											<Input
												id="zipCode"
												label="Zip Code"
												requiredIndicator
												error={errors.zipCode?.message}
												{...register("zipCode")}
											/>
										</div>
										<div className="sm:col-span-2">
											<Input
												id="city"
												label="City"
												requiredIndicator
												error={errors.city?.message}
												{...register("city")}
											/>
										</div>
									</div>

									<Input
										id="address"
										label="Address"
										requiredIndicator
										error={errors.address?.message}
										{...register("address")}
									/>

									<Input
										id="email"
										label="Email"
										type="email"
										requiredIndicator
										error={errors.email?.message}
										{...register("email")}
									/>

									<Input
										id="phone"
										label="Phone no."
										type="tel"
										requiredIndicator
										error={errors.phone?.message}
										{...register("phone")}
									/>
								</div>
							</Card>

							<div className="space-y-4">
								<Heading variant="h2" className="text-2xl font-bold mb-0">
									Select your prefered delivery method
								</Heading>
								<Card padding="lg">
									<SelectionGroup
										className="mb-8"
										options={[
											{ id: "home", label: "Home delivery" },
											{ id: "collect", label: "Click-and-collect" },
											{ id: "post", label: "Postoffice" },
										]}
										selectedValue={deliveryMethod}
										onSelect={(val) =>
											setDeliveryMethod(val as "home" | "collect" | "post")
										}
									/>

									{deliveryMethod === "home" && (
										<div className="space-y-2">
											<Text variant="default" className="font-bold">
												Your order will be shipped to
											</Text>
											<div className="text-gray-700">
												<Text>
													{formValues.address || "No address provided"}
												</Text>
												<Text>{formValues.city || "No city"}</Text>
												<Text>{formValues.zipCode || "No zip code"}</Text>
												<Text>United Kingdom</Text>
											</div>
										</div>
									)}

									{deliveryMethod === "collect" && (
										<div className="space-y-6">
											<Text variant="default" className="font-bold">
												Your order will be shipped to
											</Text>
											<div className="space-y-4">
												<StoreOption
													city="Edinburgh"
													address="2 Joppa Rd, Edinburgh, EH15 2EU"
													hours={[
														"Monday to Friday: 10:00am - 5:30pm",
														"Saturday: 10:00am - 5:30pm",
														"Sunday: Closed",
													]}
													defaultChecked
												/>
												<StoreOption
													city="Falkirk"
													address="44 Cow Wynd, Falkirk, Central Region, FK1 1PU"
													hours={[
														"Monday to Friday: 10:00am - 5:30pm",
														"Saturday - By appointment only",
														"Sunday: Closed",
													]}
												/>
											</div>
										</div>
									)}

									{deliveryMethod === "post" && (
										<div className="space-y-4">
											<Text
												variant="default"
												className="font-bold flex items-center gap-2"
											>
												Your order will be shipped with{" "}
												<SiFedex className="text-[#4D148C] text-4xl inline-block" />{" "}
												selected a postoffice
											</Text>
											<div className="h-48 bg-gray-200 w-full rounded-sm flex items-center justify-center text-gray-500">
												Map Placeholder
											</div>
											<div className="space-y-2">
												<PostOfficeOption
													address="Postoffice - 4 Leah Close, Edinburgh, United Kingdom"
													defaultChecked
												/>
												<PostOfficeOption address="Postoffice - 7 The Old School House, Edinburgh, United Kingdom" />
												<PostOfficeOption address="Postoffice - 28 Thwaites Oak Close, Edinburgh, United Kingdom" />
											</div>
										</div>
									)}
								</Card>
							</div>

							<div className="space-y-4">
								<Heading variant="h2" className="text-2xl font-bold mb-0">
									Choose payment method
								</Heading>
								<Card padding="none" className="divide-y overflow-hidden">
									<PaymentMethodOption
										checked={paymentMethod === "card"}
										onChange={() => setPaymentMethod("card")}
										label="Pay with credit card"
										icons={[FaCcStripe, FaCcVisa, FaCcMastercard]}
									/>
									<PaymentMethodOption
										checked={paymentMethod === "paypal"}
										onChange={() => setPaymentMethod("paypal")}
										label="Pay with Paypal"
										icons={[FaCcPaypal]}
									/>
									<PaymentMethodOption
										checked={paymentMethod === "apple"}
										onChange={() => setPaymentMethod("apple")}
										label="Pay with Apple pay"
										icons={[FaApplePay]}
									/>
								</Card>
							</div>
						</div>

						<div className="lg:col-span-1">
							<Card className="sticky top-24 space-y-6">
								<Heading variant="h2" className="text-2xl font-bold mb-0">
									Payment overview
								</Heading>

								<ul className="space-y-3 pb-6 border-b border-gray-200">
									{items.map((item, idx) => (
										<li
											key={`${item.id}-${idx}`}
											className="flex justify-between text-sm"
										>
											<span className="text-gray-600 truncate flex-1 pr-4">
												{item.title}
											</span>
											<span className="text-gray-900 font-medium whitespace-nowrap">
												{formatPrice(item.price * item.quantity)}
											</span>
										</li>
									))}
								</ul>

								<div className="space-y-4">
									<div className="flex justify-between items-end">
										<Text variant="small" className="text-gray-600">
											Price
										</Text>
										<Text className="font-bold">{formatPrice(subTotal)}</Text>
									</div>

									<div className="space-y-2 py-4 border-b border-gray-200">
										<div className="flex justify-between text-sm">
											<Text variant="small" className="text-gray-600">
												Delivery price
											</Text>
											<Text variant="small" className="text-gray-900">
												{formatPrice(deliveryCost)}
											</Text>
										</div>
										<div className="flex justify-between text-sm">
											<Text variant="small" className="text-gray-600">
												VAT
											</Text>
											<Text variant="small" className="text-gray-900">
												{formatPrice(calculatedVat)}
											</Text>
										</div>
									</div>

									<div className="flex justify-between items-end">
										<Text className="font-medium text-gray-600">
											Total price
										</Text>
										<Text className="font-bold text-xl">
											{formatPrice(grandTotal)}
										</Text>
									</div>
								</div>

								<div className="space-y-3 pt-4">
									<label className="flex items-center gap-2 cursor-pointer group">
										<input
											type="checkbox"
											className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
											{...register("newsletter")}
										/>
										<span className="text-sm text-gray-700 group-hover:text-black transition-colors">
											Subscribe to newsletter
										</span>
									</label>
									<div>
										<label className="flex items-center gap-2 cursor-pointer group">
											<input
												type="checkbox"
												className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
												{...register("terms")}
											/>
											<span className="text-sm text-gray-700 group-hover:text-black transition-colors">
												I accept the terms of trade{" "}
												<Link
													to="/terms-and-conditions"
													target="_blank"
													className="font-bold hover:underline"
												>
													(read in new window)
												</Link>
											</span>
										</label>
										{errors.terms && (
											<p className="text-red-500 text-xs mt-1">
												{errors.terms.message}
											</p>
										)}
									</div>
								</div>

								<Button
									size="xl"
									className="w-full"
									type="submit"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Processing..." : "Checkout"}
								</Button>
							</Card>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
}

function StoreOption({
	city,
	address,
	hours,
	defaultChecked,
}: {
	city: string;
	address: string;
	hours: string[];
	defaultChecked?: boolean;
}) {
	return (
		<label className="flex items-start gap-3 cursor-pointer group">
			<input
				type="radio"
				name="store"
				className="mt-1 accent-orange-500 cursor-pointer"
				defaultChecked={defaultChecked}
			/>
			<div>
				<span className="font-bold text-black block group-hover:text-orange-500 transition-colors">
					{city}
				</span>
				<span className="text-sm text-gray-600 block">{address}</span>
				{hours.map((h) => (
					<span key={h} className="text-sm text-gray-400 block">
						{h}
					</span>
				))}
			</div>
		</label>
	);
}

function PostOfficeOption({
	address,
	defaultChecked,
}: {
	address: string;
	defaultChecked?: boolean;
}) {
	return (
		<label className="flex items-center gap-3 cursor-pointer p-4 border rounded-sm hover:border-orange-500 transition-all bg-[#F9FAFB]">
			<input
				type="radio"
				name="postoffice"
				defaultChecked={defaultChecked}
				className="accent-orange-500 cursor-pointer"
			/>
			<span className="text-sm text-gray-700">{address}</span>
		</label>
	);
}

function PaymentMethodOption({
	label,
	icons: Icons,
	checked,
	onChange,
}: {
	label: string;
	icons: React.ElementType[];
	checked: boolean;
	onChange: () => void;
}) {
	return (
		<label
			className={cn(
				"flex items-center gap-4 p-6 cursor-pointer transition-colors hover:bg-gray-50",
				checked && "bg-orange-50/20",
			)}
		>
			<input
				type="radio"
				name="payment"
				checked={checked}
				onChange={onChange}
				className="accent-orange-500 size-4 cursor-pointer"
			/>
			<div className="flex gap-2 items-center">
				{Icons.map((Icon) => (
					<div
						key={`icon-${label}`}
						className="h-10 w-14 bg-black text-white rounded flex items-center justify-center"
					>
						<Icon className="text-3xl" />
					</div>
				))}
			</div>
			<span className="font-medium text-[#495464]">{label}</span>
		</label>
	);
}
