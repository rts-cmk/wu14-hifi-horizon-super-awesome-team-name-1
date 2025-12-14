import { createFileRoute } from "@tanstack/react-router";
import {
	FaApplePay,
	FaCcMastercard,
	FaCcPaypal,
	FaCcStripe,
	FaCcVisa,
} from "react-icons/fa";
import { SiFedex } from "react-icons/si";
import { CheckoutStepper } from "@/components/checkout-stepper";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";

export const Route = createFileRoute("/payment")({
	component: PaymentComponent,
});

const formatPrice = (price: number) =>
	`£ ${price.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`;

function PaymentComponent() {
	const { items, total } = useCartStore();
	const {
		formData,
		deliveryMethod,
		paymentMethod,
		setFormData,
		setDeliveryMethod,
		setPaymentMethod,
	} = useCheckoutStore();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const subTotal = total();
	const deliveryCost = 4;
	const calculatedVat = subTotal * 0.2;
	const grandTotal = subTotal + deliveryCost;

	return (
		<main className="min-h-screen w-full bg-[#F5F5F5] pt-10 pb-20">
			<div className="max-w-7xl mx-auto px-4">
				<CheckoutStepper currentStep="payment" />

				<h1 className="text-3xl font-bold text-[#495464] mb-8">Your info</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Forms */}
					<div className="lg:col-span-2 space-y-8">
						{/* Info Form */}
						<div className="bg-white p-8 rounded-sm shadow-sm">
							<div className="space-y-4">
								<div>
									<label
										htmlFor="fullName"
										className="block text-sm font-bold text-gray-700 mb-1"
									>
										Full name <span className="text-red-500">*</span>
									</label>
									<input
										id="fullName"
										type="text"
										name="fullName"
										value={formData.fullName}
										onChange={handleChange}
										className="w-full bg-[#E8E8E8] border-none rounded-sm p-3 focus:ring-2 focus:ring-orange-500"
									/>
								</div>

								<div className="grid grid-cols-3 gap-4">
									<div className="col-span-1">
										<label
											htmlFor="zipCode"
											className="block text-sm font-bold text-gray-700 mb-1"
										>
											Zip-code <span className="text-red-500">*</span>
										</label>
										<input
											id="zipCode"
											type="text"
											name="zipCode"
											value={formData.zipCode}
											onChange={handleChange}
											className="w-full bg-[#E8E8E8] border-none rounded-sm p-3 focus:ring-2 focus:ring-orange-500"
										/>
									</div>
									<div className="col-span-2">
										<label
											htmlFor="city"
											className="block text-sm font-bold text-gray-700 mb-1"
										>
											City <span className="text-red-500">*</span>
										</label>
										<input
											id="city"
											type="text"
											name="city"
											value={formData.city}
											onChange={handleChange}
											className="w-full bg-[#E8E8E8] border-none rounded-sm p-3 focus:ring-2 focus:ring-orange-500"
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="address"
										className="block text-sm font-bold text-gray-700 mb-1"
									>
										Address <span className="text-red-500">*</span>
									</label>
									<input
										id="address"
										type="text"
										name="address"
										value={formData.address}
										onChange={handleChange}
										className="w-full bg-[#E8E8E8] border-none rounded-sm p-3 focus:ring-2 focus:ring-orange-500"
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-bold text-gray-700 mb-1"
									>
										Email <span className="text-red-500">*</span>
									</label>
									<input
										id="email"
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="w-full bg-[#E8E8E8] border-none rounded-sm p-3 focus:ring-2 focus:ring-orange-500"
									/>
								</div>

								<div>
									<label
										htmlFor="phone"
										className="block text-sm font-bold text-gray-700 mb-1"
									>
										Phone no. <span className="text-red-500">*</span>
									</label>
									<input
										id="phone"
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										className="w-full bg-[#E8E8E8] border-none rounded-sm p-3 focus:ring-2 focus:ring-orange-500"
									/>
								</div>
							</div>
						</div>

						{/* Delivery Method */}
						<div>
							<h2 className="text-2xl font-bold text-[#495464] mb-4">
								Select your prefered delivery method
							</h2>
							<div className="bg-white p-8 rounded-sm shadow-sm">
								<div className="flex gap-4 mb-8">
									<button
										type="button"
										onClick={() => setDeliveryMethod("home")}
										className={cn(
											"px-6 py-2 rounded-sm text-sm font-medium border transition-colors",
											deliveryMethod === "home"
												? "bg-[#495464] text-white border-[#495464]"
												: "bg-white text-gray-500 border-gray-300 hover:border-gray-400",
										)}
									>
										Home delivery
									</button>
									<button
										type="button"
										onClick={() => setDeliveryMethod("collect")}
										className={cn(
											"px-6 py-2 rounded-sm text-sm font-medium border transition-colors",
											deliveryMethod === "collect"
												? "bg-[#495464] text-white border-[#495464]"
												: "bg-white text-gray-500 border-gray-300 hover:border-gray-400",
										)}
									>
										Click-and-collect
									</button>
									<button
										type="button"
										onClick={() => setDeliveryMethod("post")}
										className={cn(
											"px-6 py-2 rounded-sm text-sm font-medium border transition-colors",
											deliveryMethod === "post"
												? "bg-[#495464] text-white border-[#495464]"
												: "bg-white text-gray-500 border-gray-300 hover:border-gray-400",
										)}
									>
										Postoffice
									</button>
								</div>

								{deliveryMethod === "home" && (
									<div>
										<h3 className="font-bold text-black mb-2">
											Your order will be shipped to
										</h3>
										<div className="text-gray-700">
											<p>{formData.address || "No address provided"}</p>
											<p>{formData.city || "No city"}</p>
											<p>{formData.zipCode || "No zip code"}</p>
											<p>United Kingdom</p>
										</div>
									</div>
								)}

								{deliveryMethod === "collect" && (
									<div className="space-y-6">
										<h3 className="font-bold text-black mb-2">
											Your order will be shipped to
										</h3>
										<div className="space-y-4">
											<label className="flex items-start gap-3 cursor-pointer">
												<input
													type="radio"
													name="store"
													className="mt-1"
													defaultChecked
												/>
												<div>
													<span className="font-bold text-black block">
														Edinburgh
													</span>
													<span className="text-sm text-gray-600 block">
														2 Joppa Rd, Edinburgh, EH15 2EU
													</span>
													<span className="text-sm text-gray-600 block">
														Monday to Friday: 10:00am - 5:30pm
													</span>
													<span className="text-sm text-gray-600 block">
														Saturday: 10:00am - 5:30pm
													</span>
													<span className="text-sm text-gray-600 block">
														Sunday: Closed
													</span>
												</div>
											</label>
											<label className="flex items-start gap-3 cursor-pointer">
												<input type="radio" name="store" className="mt-1" />
												<div>
													<span className="font-bold text-black block">
														Falkirk
													</span>
													<span className="text-sm text-gray-600 block">
														44 Cow Wynd, Falkirk, Central Region, FK1 1PU
													</span>
													<span className="text-sm text-gray-600 block">
														Monday to Friday: 10:00am - 5:30pm
													</span>
													<span className="text-sm text-gray-600 block">
														Saturday - By appointment only
													</span>
													<span className="text-sm text-gray-600 block">
														Sunday: Closed
													</span>
												</div>
											</label>
										</div>
									</div>
								)}

								{deliveryMethod === "post" && (
									<div>
										<h3 className="font-bold text-black mb-4 flex items-center gap-2">
											Your order will be shipped with{" "}
											<SiFedex className="text-[#4D148C] text-4xl inline-block" />{" "}
											selected a postoffice
										</h3>
										<div className="h-48 bg-gray-200 w-full mb-6 rounded-sm flex items-center justify-center text-gray-500">
											Map Placeholder
										</div>
										<div className="space-y-4">
											<label className="flex items-center gap-3 cursor-pointer p-3 border rounded-sm hover:border-gray-400">
												<input type="radio" name="postoffice" defaultChecked />
												<span className="text-sm">
													Postoffice - 4 Leah Close, Edinburgh, United Kingdom
												</span>
											</label>
											<label className="flex items-center gap-3 cursor-pointer p-3 border rounded-sm hover:border-gray-400">
												<input type="radio" name="postoffice" />
												<span className="text-sm">
													Postoffice - 7 The Old School House, Edinburgh, United
													Kingdom
												</span>
											</label>
											<label className="flex items-center gap-3 cursor-pointer p-3 border rounded-sm hover:border-gray-400">
												<input type="radio" name="postoffice" />
												<span className="text-sm">
													Postoffice - 28 Thwaites Oak Close, Edinburgh, United
													Kingdom
												</span>
											</label>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Payment Method */}
						<div>
							<h2 className="text-2xl font-bold text-[#495464] mb-4">
								Choose payment method
							</h2>
							<div className="bg-white rounded-sm shadow-sm divide-y">
								<label className="flex items-center gap-4 p-6 cursor-pointer">
									<input
										type="radio"
										name="payment"
										checked={paymentMethod === "card"}
										onChange={() => setPaymentMethod("card")}
										className="text-orange-500 focus:ring-orange-500"
									/>
									<div className="flex gap-2 items-center">
										<div className="h-10 w-14 bg-black text-white rounded flex items-center justify-center">
											<FaCcStripe className="text-4xl" />
										</div>
										<div className="h-10 w-14 bg-black text-white rounded flex items-center justify-center">
											<FaCcVisa className="text-4xl" />
										</div>
										<div className="h-10 w-14 bg-black text-white rounded flex items-center justify-center">
											<FaCcMastercard className="text-4xl" />
										</div>
									</div>
									<span className="font-medium">Pay with credit card</span>
								</label>

								<label className="flex items-center gap-4 p-6 cursor-pointer">
									<input
										type="radio"
										name="payment"
										checked={paymentMethod === "paypal"}
										onChange={() => setPaymentMethod("paypal")}
										className="text-orange-500 focus:ring-orange-500"
									/>
									<div className="h-10 w-14 bg-black text-white rounded flex items-center justify-center">
										<FaCcPaypal className="text-4xl" />
									</div>
									<span className="font-medium">Pay with Paypal</span>
								</label>

								<label className="flex items-center gap-4 p-6 cursor-pointer">
									<input
										type="radio"
										name="payment"
										checked={paymentMethod === "apple"}
										onChange={() => setPaymentMethod("apple")}
										className="text-orange-500 focus:ring-orange-500"
									/>
									<div className="h-10 w-14 bg-black text-white rounded flex items-center justify-center">
										<FaApplePay className="text-4xl" />
									</div>
									<span className="font-medium">Pay with Apple pay</span>
								</label>
							</div>
						</div>
					</div>

					{/* Right Column - Sticky Overview */}
					<div className="lg:col-span-1">
						<div className="sticky top-24 bg-white p-6 rounded-sm shadow-sm space-y-6">
							<h2 className="text-2xl font-bold text-[#495464]">
								Payment overview
							</h2>

							<ul className="space-y-3 pb-6 border-b border-gray-200">
								{items.map((item) => (
									<li key={item.id} className="flex justify-between text-sm">
										<span className="text-gray-600 truncate flex-1 pr-4">
											{item.title}
										</span>
										<span className="text-gray-900 font-medium whitespace-nowrap">
											{formatPrice(item.price * item.quantity)}
										</span>
									</li>
								))}
							</ul>

							<div className="flex justify-between items-end">
								<span className="text-sm text-gray-600">Price</span>
								<span className="font-bold text-black">
									{formatPrice(subTotal)}
								</span>
							</div>

							<div className="space-y-2 py-4 border-b border-gray-200">
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">Delivery price</span>
									<span className="text-gray-900">
										{formatPrice(deliveryCost)}
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-600">VAT</span>
									<span className="text-gray-900">
										{formatPrice(calculatedVat)}
									</span>
								</div>
							</div>

							<div className="flex justify-between items-end">
								<span className="font-medium text-gray-600">Total price</span>
								<span className="font-bold text-black text-xl">
									{formatPrice(grandTotal)}
								</span>
							</div>

							<div className="space-y-3 pt-4">
								<label className="flex items-center gap-2 cursor-pointer">
									<input
										type="checkbox"
										name="newsletter"
										checked={formData.newsletter}
										onChange={handleChange}
										className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
									/>
									<span className="text-sm text-gray-700">
										Subscribe to newsletter
									</span>
								</label>
								<label className="flex items-center gap-2 cursor-pointer">
									<input
										type="checkbox"
										name="terms"
										checked={formData.terms}
										onChange={handleChange}
										className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
									/>
									<span className="text-sm text-gray-700">
										I accept the terms of trade{" "}
										<a
											href="/terms"
											target="_blank"
											rel="noopener noreferrer"
											className="font-bold"
										>
											(read in new window)
										</a>
									</span>
								</label>
							</div>

							<button
								type="button"
								className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-sm transition-colors shadow-sm"
							>
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
