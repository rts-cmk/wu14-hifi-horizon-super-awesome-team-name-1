import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { type CompareProduct, useComparisonStore } from "@/stores/comparison";

interface ComparisonDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const formatPrice = (price: number) =>
	price.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

export function ComparisonDialog({
	open,
	onOpenChange,
}: ComparisonDialogProps) {
	const [search, setSearch] = useState("");
	const [products, setProducts] = useState<CompareProduct[]>([]);
	const [loading, setLoading] = useState(false);
	const {
		addProduct,
		isInComparison,
		products: compareProducts,
	} = useComparisonStore();

	useEffect(() => {
		if (!open) return;

		const fetchProducts = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/products");
				const data = await res.json();
				setProducts(data);
			} catch (error) {
				console.error("Failed to fetch products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [open]);

	const filteredProducts = products.filter((p) =>
		p.title.toLowerCase().includes(search.toLowerCase()),
	);

	const handleAdd = (product: CompareProduct) => {
		addProduct(product);
		if (compareProducts.length >= 2) {
			onOpenChange(false);
		}
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<button
				type="button"
				className="fixed inset-0 bg-black/50 cursor-default"
				onClick={() => onOpenChange(false)}
				aria-label="Close dialog"
			/>

			<div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col z-50">
				<div className="flex items-center justify-between p-4 border-b shrink-0">
					<h2 className="text-lg md:text-xl font-semibold">Add Product to Compare</h2>
					<button
						type="button"
						onClick={() => onOpenChange(false)}
						className="text-gray-400 hover:text-gray-600 p-1"
					>
						<X className="size-6" />
					</button>
				</div>

				<div className="p-4 border-b shrink-0">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search products..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
						/>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-4">
					{loading ? (
						<div className="text-center py-8 text-gray-500">Loading...</div>
					) : filteredProducts.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							No products found
						</div>
					) : (
						<div className="space-y-2">
							{filteredProducts.map((product) => {
								const inComparison = isInComparison(product.id);
								const isMaxReached = !inComparison && compareProducts.length >= 3;
								
								return (
									<div
										key={product.id}
										className={cn(
											"flex items-center gap-3 p-3 border rounded-sm",
											inComparison
												? "bg-gray-50 border-gray-300"
												: "border-gray-200",
										)}
									>
										<div className="w-16 h-16 bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
											{product.images?.[0] && (
												<img
													src={product.images[0].url}
													alt={product.images[0].alt || product.title}
													className="max-w-full max-h-full object-contain"
												/>
											)}
										</div>
										<div className="flex-1 min-w-0">
											<p className="font-semibold text-black text-sm md:text-base">
												{product.title}
											</p>
											<p className="text-sm text-gray-600">
												{formatPrice(product.price)}
											</p>
										</div>
										<button
											type="button"
											onClick={() => handleAdd(product)}
											disabled={inComparison || isMaxReached}
											className={cn(
												"px-4 py-2 rounded-sm text-sm font-medium transition-colors shrink-0",
												inComparison || isMaxReached
													? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
													: "bg-orange-500 text-white hover:bg-orange-600",
											)}
										>
											{inComparison ? "Added" : "Add"}
										</button>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
