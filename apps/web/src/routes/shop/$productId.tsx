import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { ProductColorSelector } from "@/components/product-color-selector";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { ProductQuantitySelector } from "@/components/product-quantity-selector";
import { ProductSpecifications } from "@/components/product-specifications";
import { ProductStockIndicator } from "@/components/product-stock-indicator";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { useComparisonStore } from "@/stores/comparison";

export const Route = createFileRoute("/shop/$productId")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const res = await fetch(`/api/products/${params.productId}`);
		return res.json();
	},
});

const formatPrice = (price: number) =>
	price.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

function RouteComponent() {
	const product = Route.useLoaderData();
	const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
	const [quantity, setQuantity] = useState(1);
	const { addItem } = useCartStore();
	const {
		addProduct,
		isInComparison,
		products: compareProducts,
	} = useComparisonStore();

	const canAddToCart = product.stock > 0 && quantity <= product.stock;
	const inComparison = isInComparison(product.id);

	const handleAddToCompare = () => {
		addProduct({
			id: product.id,
			title: product.title,
			price: product.price,
			images: product.images,
			specifications: product.specifications,
		});
	};

	const handleAddToCart = () => {
		addItem({
			id: product.id,
			title: product.title,
			brand: product.brand,
			price: product.price,
			stock: product.stock,
			images: product.images,
			quantity: quantity,
			color: selectedColor,
		});
	};

	return (
		<main className="min-h-screen w-full pb-32">
			<div className="px-8">
				<div className="flex items-center justify-between py-10">
					<h1 className="text-4xl text-[#495464] font-semibold uppercase">
						Product
					</h1>
					<button
						type="button"
						onClick={handleAddToCompare}
						disabled={inComparison || compareProducts.length >= 3}
						className={cn(
							"flex items-center gap-2 px-4 py-2 rounded-sm transition-colors",
							inComparison || compareProducts.length >= 3
								? "text-gray-400 cursor-not-allowed"
								: "text-gray-600 hover:text-gray-900",
						)}
					>
						{inComparison ? "Added to Compare" : "Compare"}
						<SlidersHorizontal className="size-5" />
					</button>
				</div>

				<section className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
					<ProductImageCarousel
						images={product.images}
						productTitle={product.title}
					/>

					<article className="space-y-6">
						<h2 className="text-2xl font-semibold text-black">
							{product.title}
						</h2>

						{product.descriptions?.map((desc: string) => (
							<p key={desc.slice(0, 50)} className="text-black">
								{desc}
							</p>
						))}

						<ProductColorSelector
							colors={product.colors}
							selectedColor={selectedColor}
							onColorSelect={setSelectedColor}
						/>

						<div className="flex items-center justify-between">
							<p className="text-2xl font-semibold text-black">
								{formatPrice(product.price)}
							</p>
							<ProductStockIndicator stock={product.stock} />
						</div>

						<div className="flex items-center gap-4">
							<ProductQuantitySelector
								quantity={quantity}
								stock={product.stock}
								onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
								onIncrement={() =>
									setQuantity((q) => Math.min(product.stock, q + 1))
								}
							/>

							<button
								type="button"
								disabled={!canAddToCart}
								onClick={handleAddToCart}
								className={cn(
									"flex-1 text-white text-lg font-medium py-3 px-8 rounded-sm transition-colors",
									canAddToCart
										? "bg-orange-500 hover:bg-orange-600"
										: "bg-gray-300 cursor-not-allowed",
								)}
							>
								Add to cart
							</button>
						</div>
					</article>
				</section>
			</div>

			<ProductSpecifications specifications={product.specifications} />
		</main>
	);
}
