import { Link } from "@tanstack/react-router";
import { Plus, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useComparisonStore } from "@/stores/comparison";
import { ComparisonDialog } from "./comparison-dialog";

const formatPrice = (price: number) =>
	price.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

export function ComparisonBar() {
	const { products, removeProduct } = useComparisonStore();
	const [dialogOpen, setDialogOpen] = useState(false);

	if (products.length === 0) return null;

	return (
		<>
			<div className="fixed bottom-0 left-0 right-0 bg-[#E8E8E8] z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
					{/* Product List */}
					<div className="flex gap-4 overflow-x-auto pb-2 -mb-2 mask-gradient-right flex-1">
						{products.map((product) => (
							<div
								key={product.id}
								className="relative flex items-center gap-4 bg-white shadow-sm p-4 w-[280px] shrink-0 h-[100px]"
							>
								<button
									type="button"
									onClick={() => removeProduct(product.id)}
									className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors"
									aria-label="Remove"
								>
									<X className="size-5" />
								</button>

								<div className="w-20 h-16 bg-black flex items-center justify-center shrink-0 overflow-hidden">
									{product.images?.[0] && (
										<img
											src={product.images[0].url}
											alt={product.title}
											className="w-full h-full object-cover"
										/>
									)}
								</div>

								<div className="flex-1 min-w-0 flex flex-col justify-center h-full">
									<p className="text-xs font-semibold text-black line-clamp-2 leading-tight mb-1">
										{product.title}
									</p>
									<p className="text-sm font-bold text-black">
										{formatPrice(product.price)}
									</p>
								</div>
							</div>
						))}

						{/* Add Button Placeholder - if needed to match functionality, though image doesn't explicitly show an 'add' card, logic implies it */}
						{products.length < 3 && (
							<button
								type="button"
								onClick={() => setDialogOpen(true)}
								className="w-[280px] shrink-0 h-[100px] border-2 border-dashed border-gray-300 bg-white/50 flex flex-col items-center justify-center text-gray-400 hover:bg-white hover:border-gray-400 hover:text-gray-600 transition-all gap-2"
							>
								<Plus className="size-6" />
								<span className="text-sm font-medium">Add Product</span>
							</button>
						)}
					</div>

					<div className="flex items-center gap-4 shrink-0">
						{/* Message Bubble */}
						{products.length < 2 && (
							<div className="hidden md:flex relative bg-[#B8B8B8] text-white px-4 py-2 text-sm font-medium items-center shadow-sm">
								You can compare up to 3 products
								<div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#B8B8B8] rotate-45" />
							</div>
						)}

						{/* Compare Button */}
						<Link
							to="/compare"
							className={cn(
								"bg-[#EF6C2E] hover:bg-[#E55B1E] text-white h-[100px] w-[140px] flex flex-col items-center justify-center gap-1 transition-colors shadow-sm",
								products.length < 2 && "opacity-50 pointer-events-none",
							)}
						>
							<span className="text-lg font-medium">Compare</span>
							<SlidersHorizontal className="size-6 rotate-90" />
						</Link>
					</div>
				</div>
			</div>

			<ComparisonDialog open={dialogOpen} onOpenChange={setDialogOpen} />
		</>
	);
}
