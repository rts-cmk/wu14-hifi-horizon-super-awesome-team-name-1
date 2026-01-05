import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { ProductStockIndicator } from "@/components/product-stock-indicator";
import { ShopFilters, type ShopFiltersState } from "@/components/shop-filters";
import { useProductSearch } from "@/hooks/use-product-search";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { useComparisonStore } from "@/stores/comparison";
import type { Product } from "@/types/product";

const productsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: async () => {
		const response = await fetch("/api/products");
		if (!response.ok) throw new Error("Failed to fetch products");
		return response.json() as Promise<Product[]>;
	},
});

const shopSearchSchema = z.object({
	search: z.string().optional(),
	brand: z
		.array(z.string())
		.or(z.string().transform((v) => [v]))
		.optional(),
	color: z
		.array(z.string())
		.or(z.string().transform((v) => [v]))
		.optional(),
	price: z.string().optional(),
	category: z
		.array(z.string())
		.or(z.string().transform((v) => [v]))
		.optional(),
});

export const Route = createFileRoute("/shop/")({
	component: ShopComponent,
	validateSearch: (search) => shopSearchSchema.parse(search),
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(productsQueryOptions);
	},
});

function ShopComponent() {
	const { data } = useSuspenseQuery(productsQueryOptions);
	const searchParams = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	const { filteredProducts, availableFilters } = useProductSearch(
		data,
		searchParams.search || "",
		{
			brand: searchParams.brand || null,
			color: searchParams.color || null,
			price: searchParams.price || null,
			category: searchParams.category || null,
		},
	);

	const { addProduct, isInComparison } = useComparisonStore();
	const { addItem } = useCartStore();

	const handleFiltersChange = (newFilters: ShopFiltersState) => {
		navigate({
			search: (prev) => ({
				...prev,
				category:
					newFilters.category && newFilters.category.length > 0
						? newFilters.category
						: undefined,
				brand:
					newFilters.brand && newFilters.brand.length > 0
						? newFilters.brand
						: undefined,
				color:
					newFilters.color && newFilters.color.length > 0
						? newFilters.color
						: undefined,
				price: newFilters.price || undefined,
			}),
			replace: true,
			resetScroll: false,
		});
	};

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
					<ShopFilters
						filters={{
							category: searchParams.category || null,
							brand: searchParams.brand || null,
							color: searchParams.color || null,
							price: searchParams.price || null,
						}}
						onFiltersChange={handleFiltersChange}
						options={availableFilters}
					/>
				</aside>

				<section className="flex-1">
					<div className="block lg:hidden mb-6">
						<ShopFilters
							filters={{
								category: searchParams.category || null,
								brand: searchParams.brand || null,
								color: searchParams.color || null,
								price: searchParams.price || null,
							}}
							onFiltersChange={handleFiltersChange}
							options={availableFilters}
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredProducts.map((product: Product) => {
							const thumbnail = product.images?.[0]?.url;
							const inComparison = isInComparison(product.id);

							const handleAddToCompare = () => {
								addProduct({
									id: product.id,
									title: product.title,
									price: product.price,
									images: product.images,
									specifications: product.specifications || [],
								});
							};

							const handleAddToCart = (e: React.MouseEvent) => {
								e.preventDefault();
								e.stopPropagation();
								addItem({
									id: product.id,
									title: product.title,
									brand: product.brand,
									price: product.price,
									stock: product.stock,
									images: product.images,
									quantity: 1,
								});
							};

							return (
								<Link
									key={product.id}
									to="/shop/$productId"
									params={{ productId: product.id.toString() }}
									className="bg-white rounded-xs p-6 flex flex-col h-full shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] cursor-pointer group"
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

									<figure className="aspect-square mb-4 shrink-0 p-8 flex items-center justify-center">
										{thumbnail ? (
											<img
												src={thumbnail}
												alt={product.title}
												loading="lazy"
												className="max-w-full max-h-full object-contain"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-gray-400">
												No image
											</div>
										)}
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
