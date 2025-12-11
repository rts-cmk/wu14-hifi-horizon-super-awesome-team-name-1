import { Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Drawer } from "./drawer";

interface CartDrawerProps {
	open: boolean;
	onClose: () => void;
	items?: Array<{
		id: string;
		name: string;
		price: number;
		quantity: number;
		inStock: boolean;
	}>;
	className?: string;
}

export function CartDrawer({
	open,
	onClose,
	items = [],
	className,
}: CartDrawerProps) {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
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
								<div
									key={item.id}
									className="p-4 flex gap-3 [border-block-end:1px_solid_#D2D2D2]"
								>
									<button
										type="button"
										className="text-black transition-colors self-start"
										aria-label={`Remove ${item.name}`}
									>
										<X className="size-4" />
									</button>

									<div className="w-24 h-16 shrink-0 overflow-hidden">
										<img
											src={"http://placehold.co/100x100"}
											alt={item.name}
											className="size-full object-cover"
										/>
									</div>

									<div className="flex-1 min-w-0">
										<h3 className="font-semibold text-sm leading-tight">
											{item.name}
										</h3>
										{item.inStock && (
											<p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
												In stock
												<span className="inline-block size-2 bg-green-500 rounded-full" />
											</p>
										)}

										<div className="flex items-center justify-between mt-3">
											<div className="flex items-center gap-2">
												<button
													type="button"
													className="size-8 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
													aria-label="Decrease quantity"
												>
													<Minus className="size-4" />
												</button>
												<span className="size-8 flex items-center justify-center border border-gray-300 text-sm font-medium">
													{item.quantity}
												</span>
												<button
													type="button"
													className="size-8 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
													aria-label="Increase quantity"
												>
													<Plus className="size-4" />
												</button>
											</div>

											<span className="font-medium text-sm">
												£{" "}
												{item.price.toLocaleString("en-GB", {
													minimumFractionDigits: 2,
												})}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="p-6 space-y-4">
					<div className="flex justify-between items-center">
						<span className="font-medium">Sub total:</span>
						<span className="text-orange-500 font-bold text-xl">
							£ {subtotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
						</span>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<button
							type="button"
							className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded transition-colors"
						>
							Go to cart
						</button>
						<button
							type="button"
							className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded transition-colors"
						>
							Go to payment
						</button>
					</div>
				</div>
			</div>
		</Drawer>
	);
}
