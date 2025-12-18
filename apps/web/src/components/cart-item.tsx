import { Minus, Plus, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { CartProduct } from "@/stores/cart";

interface CartItemProps {
	item: CartProduct;
	variant?: "default" | "drawer";
	onRemove: () => void;
	onUpdateQuantity: (quantity: number) => void;
}

export function CartItem({
	item,
	variant = "default",
	onRemove,
	onUpdateQuantity,
}: CartItemProps) {
	if (variant === "drawer") {
		return (
			<div className="p-4 flex gap-3 [border-block-end:1px_solid_#D2D2D2]">
				<button
					type="button"
					onClick={onRemove}
					className="text-black transition-colors self-start"
					aria-label={`Remove ${item.title}`}
				>
					<X className="size-4" />
				</button>

				<div className="w-24 h-16 shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
					<img
						src={item.images[0].url}
						alt={item.title}
						className="size-full object-contain"
					/>
				</div>

				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-sm leading-tight text-black">
						{item.title}
					</h3>
					{item.stock > 0 && (
						<p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
							In stock
							<span className="inline-block size-2 bg-green-500 rounded-full" />
						</p>
					)}

					<div className="flex items-center justify-between mt-3">
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => onUpdateQuantity(item.quantity - 1)}
								disabled={item.quantity <= 1}
								className="size-8 flex items-center justify-center text-gray-600 hover:text-black transition-colors disabled:opacity-50"
								aria-label="Decrease quantity"
							>
								<Minus className="size-4" />
							</button>
							<span className="size-8 flex items-center justify-center border border-gray-300 text-sm font-medium text-black">
								{item.quantity}
							</span>
							<button
								type="button"
								onClick={() => onUpdateQuantity(item.quantity + 1)}
								disabled={item.quantity >= item.stock}
								className="size-8 flex items-center justify-center text-gray-600 hover:text-black transition-colors disabled:opacity-50"
								aria-label="Increase quantity"
							>
								<Plus className="size-4" />
							</button>
						</div>

						<span className="font-medium text-sm text-black">
							{formatPrice(item.price * item.quantity)}
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="relative bg-white p-6 rounded-sm shadow-sm flex flex-col md:flex-row items-center gap-6">
			<button
				type="button"
				onClick={onRemove}
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
					onClick={() => onUpdateQuantity(item.quantity - 1)}
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
					onClick={() => onUpdateQuantity(item.quantity + 1)}
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
	);
}
