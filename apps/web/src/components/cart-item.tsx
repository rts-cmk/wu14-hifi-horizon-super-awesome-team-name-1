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
					className="text-black transition-colors self-start mt-1"
					aria-label={`Remove ${item.title}`}
				>
					<X className="size-4" />
				</button>

				<div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
					<img
						src={item.images[0].url}
						alt={item.title}
						className="size-full object-contain p-2"
					/>
				</div>

				<div className="flex-1 min-w-0 flex flex-col justify-between py-1">
					<div>
						<h3 className="font-semibold text-sm leading-tight text-black line-clamp-2">
							{item.title}
						</h3>
						{item.stock > 0 && (
							<p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
								In stock
								<span className="inline-block size-1.5 bg-green-500 rounded-full" />
							</p>
						)}
					</div>

					<div className="flex items-center justify-between mt-2">
						<div className="flex items-center gap-1">
							<button
								type="button"
								onClick={() => onUpdateQuantity(item.quantity - 1)}
								disabled={item.quantity <= 1}
								className="size-7 flex items-center justify-center text-gray-600 hover:text-black transition-colors disabled:opacity-50 border border-gray-200 rounded-xs"
								aria-label="Decrease quantity"
							>
								<Minus className="size-3" />
							</button>
							<span className="w-8 text-center text-sm font-medium text-black">
								{item.quantity}
							</span>
							<button
								type="button"
								onClick={() => onUpdateQuantity(item.quantity + 1)}
								disabled={item.quantity >= item.stock}
								className="size-7 flex items-center justify-center text-gray-600 hover:text-black transition-colors disabled:opacity-50 border border-gray-200 rounded-xs"
								aria-label="Increase quantity"
							>
								<Plus className="size-3" />
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
		<div className="relative bg-white p-4 md:p-6 rounded-sm shadow-sm flex flex-col sm:flex-row items-center gap-4 md:gap-6">
			<button
				type="button"
				onClick={onRemove}
				className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-black transition-colors p-2"
			>
				<X className="size-5" />
			</button>

			<div className="w-24 h-24 md:w-32 md:h-24 flex items-center justify-center shrink-0 bg-gray-50 rounded-sm">
				{item.images?.[0] ? (
					<img
						src={item.images[0].url}
						alt={item.title}
						className="max-w-full max-h-full object-contain p-2"
					/>
				) : (
					<div className="w-full h-full bg-gray-100" />
				)}
			</div>

			<div className="flex-1 text-center sm:text-left w-full sm:w-auto">
				<h3 className="text-base md:text-lg font-medium text-[#495464] mb-1 line-clamp-2">
					{item.title}
				</h3>
				<div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
					<div className="w-2 h-2 rounded-full bg-green-500" />
					<span className="text-[#495464]">In stock</span>
				</div>
			</div>

			<div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-8 px-4 sm:px-0">
				<div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-sm">
					<button
						type="button"
						onClick={() => onUpdateQuantity(item.quantity - 1)}
						className="text-[#495464] hover:text-black disabled:opacity-50 p-1"
						disabled={item.quantity <= 1}
					>
						<Minus className="size-4" />
					</button>
					<div className="min-w-6 text-center font-medium text-[#495464]">
						{item.quantity}
					</div>
					<button
						type="button"
						onClick={() => onUpdateQuantity(item.quantity + 1)}
						className="text-[#495464] hover:text-black disabled:opacity-50 p-1"
						disabled={item.quantity >= item.stock}
					>
						<Plus className="size-4" />
					</button>
				</div>

				<div className="text-lg md:text-xl font-medium text-[#495464] min-w-[80px] text-right">
					{formatPrice(item.price * item.quantity)}
				</div>
			</div>
		</div>
	);
}
