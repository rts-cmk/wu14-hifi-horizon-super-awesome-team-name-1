import { createFileRoute, Link } from "@tanstack/react-router";
import { CartItem } from "@/components/cart-item";
import { CheckoutStepper } from "@/components/checkout-stepper";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
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
					<Heading variant="h1" className="text-3xl font-bold mb-8">
						Cart
					</Heading>
					<div className="text-center py-20 bg-white rounded-sm shadow-sm">
						<p className="text-gray-500 mb-4">Your cart is empty</p>
						<Link
							to="/shop"
							className="text-orange-500 hover:text-orange-600 font-medium"
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

				<Heading variant="h1" className="text-3xl font-bold mb-8">
					Cart
				</Heading>

				<div className="space-y-4">
					{items.map((item) => (
						<CartItem
							key={`${item.id}-${item.color || "default"}`}
							item={item}
							onRemove={() => removeItem(item.id, item.color)}
							onUpdateQuantity={(q) => updateQuantity(item.id, q, item.color)}
						/>
					))}
				</div>

				<div className="mt-8 flex flex-col items-stretch sm:items-end gap-6">
					<div className="text-xl text-[#495464] flex justify-between sm:justify-end gap-2">
						<span>Sub total</span>
						<span className="text-orange-500 font-bold ml-2">
							{formatPrice(total())}
						</span>
					</div>
					<Button asChild size="lg" className="px-8 shadow-sm w-full sm:w-auto">
						<Link to="/payment">Go to payment</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
