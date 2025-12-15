import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { CheckoutStepper } from "@/components/checkout-stepper";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";

export const Route = createFileRoute("/cart")({
	component: CartComponent,
});

function CartComponent() {
	const { items, removeItem, updateQuantity, total } = useCartStore();

	if (items.length === 0) {
		return (
			<main className="min-h-screen w-full bg-[#F5F5F5] pt-10 pb-20">
				<div className="max-w-5xl mx-auto px-4">
					<CheckoutStepper currentStep="cart" />
					<h1 className="text-3xl font-bold text-[#495464] mb-8">Cart</h1>
					<div className="text-center py-20 bg-white rounded-sm shadow-sm">
						<p className="text-gray-500 mb-4">Your cart is empty</p>
						<Link
							to="/shop"
							search={{ category: undefined }}
							className="inline-block bg-orange-500 text-white px-6 py-3 rounded-sm hover:bg-orange-600 transition-colors"
						>
							Browse Products
						</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen w-full bg-[#F5F5F5] pt-10 pb-20">
			<div className="max-w-5xl mx-auto px-4">
				<CheckoutStepper currentStep="cart" />

				<h1 className="text-3xl font-bold text-[#495464] mb-8">Cart</h1>

				<div className="space-y-4">
					{items.map((item) => (
						<div
							key={`${item.id}-${item.color || "default"}`}
							className="relative bg-white p-6 rounded-sm shadow-sm flex flex-col md:flex-row items-center gap-6"
						>
							<button
								type="button"
								onClick={() => removeItem(item.id, item.color)}
								className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
							>
								<X className="size-5" />
							</button>

							<div className="w-32 h-24 flex items-center justify-center shrink-0">
								{item.images?.[0] ? (
									<img
										src={item.images[0].url}
										alt={item.title}
										className="max-w-full max-h-full object-contain"
									/>
								) : (
									<div className="w-full h-full bg-gray-100" />
								)}
							</div>

							<div className="flex-1 text-center md:text-left">
								<h3 className="text-lg font-medium text-[#495464] mb-1">
									{item.title}
								</h3>
								<div className="flex items-center justify-center md:justify-start gap-2 text-sm">
									<div className="w-2 h-2 rounded-full bg-green-500" />
									<span className="text-[#495464]">In stock</span>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<button
									type="button"
									onClick={() =>
										updateQuantity(item.id, item.quantity - 1, item.color)
									}
									className="text-[#495464] hover:text-black disabled:opacity-50"
									disabled={item.quantity <= 1}
								>
									<Minus className="size-6" />
								</button>
								<div className="w-12 h-12 bg-[#F5F5F5] flex items-center justify-center text-lg font-medium text-[#495464]">
									{item.quantity}
								</div>
								<button
									type="button"
									onClick={() =>
										updateQuantity(item.id, item.quantity + 1, item.color)
									}
									className="text-[#495464] hover:text-black disabled:opacity-50"
									disabled={item.quantity >= item.stock}
								>
									<Plus className="size-6" />
								</button>
							</div>

							<div className="text-xl font-medium text-[#495464] min-w-[120px] text-right">
								{formatPrice(item.price * item.quantity)}
							</div>
						</div>
					))}
				</div>

				<div className="mt-8 flex flex-col items-end gap-6">
					<div className="text-xl text-[#495464]">
						Sub total{" "}
						<span className="text-orange-500 font-bold ml-2">
							{formatPrice(total())}
						</span>
					</div>
					<Link
						to="/payment"
						className="bg-orange-500 text-white px-8 py-3 rounded-sm font-medium hover:bg-orange-600 transition-colors shadow-sm inline-block text-center"
					>
						Go to payment
					</Link>
				</div>
			</div>
		</main>
	);
}
