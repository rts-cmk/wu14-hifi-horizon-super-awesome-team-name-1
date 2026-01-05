import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<article className="w-full h-full flex flex-col gap-4 bg-white p-4 border border-gray-200">
			<figure className="aspect-square p-8 flex items-center justify-center overflow-hidden">
				<img
					src={product.images[0].url}
					alt={product.title}
					className="max-w-full max-h-full object-contain"
				/>
			</figure>

			<h3 className="text-black text-xl font-bold text-center line-clamp-2">
				{product.title}
			</h3>
			<span className="text-black text-xl font-bold text-center">
				{formatPrice(product.price)}
			</span>
			<Link
				to="/shop/$productId"
				params={{ productId: product.id.toString() }}
				className="bg-orange-500 text-white py-2 px-8 rounded-xs mt-auto w-fit mx-auto hover:bg-orange-600 transition-colors"
			>
				Read more
			</Link>
		</article>
	);
}
