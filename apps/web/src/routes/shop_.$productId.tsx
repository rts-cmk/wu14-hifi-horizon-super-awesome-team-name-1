import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProductColorSelector } from "@/components/ui/product-color-selector";
import { ProductImageCarousel } from "@/components/ui/product-image-carousel";
import { ProductQuantitySelector } from "@/components/ui/product-quantity-selector";
import { ProductStockIndicator } from "@/components/ui/product-stock-indicator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop_/$productId")({
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

	const canAddToCart = product.stock > 0 && quantity <= product.stock;

	return (
		<main className="min-h-screen w-full px-8">
			<h1 className="text-4xl text-[#495464] font-semibold py-10 uppercase">
				Product
			</h1>

			<section className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<ProductImageCarousel
					images={product.images}
					productTitle={product.title}
				/>

				<article className="space-y-6">
					<h2 className="text-2xl font-semibold text-black">{product.title}</h2>
					
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
							onIncrement={() => setQuantity((q) => Math.min(product.stock, q + 1))}
						/>

						<button
							type="button"
							disabled={!canAddToCart}
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
		</main>
	);
}
