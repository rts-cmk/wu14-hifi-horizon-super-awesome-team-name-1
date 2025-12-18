import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { CartItem } from "./cart-item";
import { Drawer } from "./ui/drawer";

interface CartDrawerProps {
	open: boolean;
	onClose: () => void;
	className?: string;
}

export function CartDrawer({ open, onClose, className }: CartDrawerProps) {
	const { items, removeItem, updateQuantity, total } = useCartStore();
	const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<Drawer
			open={open}
			onClose={onClose}
			side="right"
			className={cn(className)}
		>
			<div className="flex flex-col h-full bg-white">
				<div className="flex items-center justify-between p-6">
					<h2 className="text-[#495464] text-2xl font-semibold">
						Cart{" "}
						<span className="text-black text-lg">( {itemCount} items)</span>
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-500 hover:text-black transition-colors"
						aria-label="Close cart"
					>
						<X className="size-6" />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto">
					{items.length === 0 ? (
						<p className="text-black text-center py-8">Your cart is empty</p>
					) : (
						<div>
							{items.map((item) => (
								<CartItem
									key={item.id}
									item={item}
									variant="drawer"
									onRemove={() => removeItem(item.id, item.color)}
									onUpdateQuantity={(q) =>
										updateQuantity(item.id, q, item.color)
									}
								/>
							))}
						</div>
					)}
				</div>

				<div className="p-6 space-y-4">
					<div className="flex justify-between items-center">
						<span className="font-medium text-black">Sub total:</span>
						<span className="text-orange-500 font-bold text-xl">
							{formatPrice(total())}
						</span>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Link
							to="/cart"
							onClick={onClose}
							className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded transition-colors text-center flex items-center justify-center"
						>
							Go to cart
						</Link>
						<Link
							to="/payment"
							onClick={onClose}
							disabled={itemCount < 1}
							className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded transition-colors text-center flex items-center justify-center"
						>
							Go to payment
						</Link>
					</div>
				</div>
			</div>
		</Drawer>
	);
}
