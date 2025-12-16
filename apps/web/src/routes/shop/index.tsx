import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { ProductStockIndicator } from "@/components/product-stock-indicator";
import { ShopFilters, type ShopFiltersState } from "@/components/shop-filters";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { useComparisonStore } from "@/stores/comparison";

export const Route = createFileRoute("/shop/")({
	component: ShopComponent,
	validateSearch: (search: Record<string, unknown>) => ({
		category: typeof search.category === "string" ? search.category : undefined,
	}),
	loader: async () => {
		const response = await fetch("/api/products", {
			method: "GET",
		});
		const products = await response.json();
		return products;
	},
});

function ShopComponent() {
	const data = Route.useLoaderData();
	const { addProduct, isInComparison } = useComparisonStore();
	const { addItem } = useCartStore();

	const [filters, setFilters] = useState<ShopFiltersState>({
		brand: "Logitech",
		color: null,
		price: null,
	});

	return (
		<main className="min-h-screen w-full px-6 py-10">
			<header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl sm:text-4xl text-[#495464] uppercase font-semibold tracking-wide">
						PRODUCTS
					</h1>
				</div>
			</header>

			<div className="flex gap-8">
				<aside className="w-72 hidden lg:block">
					<ShopFilters filters={filters} onFiltersChange={setFilters} />
				</aside>

				<section className="flex-1">
					<div className="block lg:hidden mb-6">
						<ShopFilters filters={filters} onFiltersChange={setFilters} />
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{data.map((product: any) => {
							const thumbnail = product.images?.[0]?.url ?? product.image;
							const inComparison = isInComparison(product.id);

							const handleAddToCompare = () => {
								addProduct({
									id: product.id,
									title: product.title || product.name,
									price: product.price,
									images: product.images || [],
									specifications: product.specifications || [],
								});
							};

							const handleAddToCart = (e: React.MouseEvent) => {
								e.preventDefault();
								e.stopPropagation();
								addItem({
									id: product.id,
									title: product.title || product.name,
									brand: product.brand || "",
									price: product.price,
									stock: product.stock,
									images: product.images || [],
									quantity: 1,
								});
							};

							return (
								<Link
									key={product.id}
									to="/shop/$productId"
									params={{ productId: product.id }}
									className="bg-white rounded-xs p-6 flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer group"
								>
									<div className="flex justify-end mb-4">
										<button
											type="button"
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												handleAddToCompare();
											}}
											disabled={inComparison}
											className={cn(
												"flex items-center gap-2 px-4 py-2 rounded-sm transition-colors",
												inComparison
													? "text-gray-400 cursor-not-allowed"
													: "text-gray-600 hover:text-gray-900",
											)}
										>
											Compare
											<SlidersHorizontal className="size-5" />
										</button>
									</div>

									<figure className="aspect-square bg-gray-200 mb-4 shrink-0">
										<img
											src={thumbnail}
											alt={product.name}
											className="object-cover w-full h-full"
										/>
									</figure>

									<div className="flex flex-col gap-4 text-center">
										<h3 className="font-medium text-lg mb-2">
											{product.title}
										</h3>
										<p className="font-bold text-xl mb-4">
											{formatPrice(product.price)}
										</p>
									</div>

									<div className="flex justify-between items-center mt-auto">
										<button
											type="button"
											onClick={handleAddToCart}
											className="bg-orange-500 text-white px-4 py-2 rounded-xs hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
											disabled={product.stock <= 0}
										>
											Add to Cart
										</button>
										<ProductStockIndicator stock={product.stock} />
									</div>
								</Link>
							);
						})}
					</div>
				</section>
			</div>
		</main>
	);
}

export default ShopComponent;
