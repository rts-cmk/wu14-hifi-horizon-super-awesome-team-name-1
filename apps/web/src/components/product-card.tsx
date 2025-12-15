import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
	id: number;
	title: string;
	price: number;
	image: string;
	alt?: string;
}

export function ProductCard({
	id,
	title,
	price,
	image,
	alt,
}: ProductCardProps) {
	return (
		<article className="w-full h-full flex flex-col gap-4 bg-white p-4 border border-gray-200">
			<figure className="w-full flex-1 flex items-center justify-center overflow-hidden h-[300px]">
				<img
					src={image}
					alt={alt || title}
					className="w-full h-full object-contain"
				/>
			</figure>

			<h3 className="text-black text-xl font-bold text-center line-clamp-2">
				{title}
			</h3>
			<span className="text-black text-xl font-bold text-center">
				{formatPrice(price)}
			</span>
			<Link
				to="/shop/$productId"
				params={{ productId: id.toString() }}
				className="bg-orange-500 text-white py-2 px-8 rounded-xs mt-auto w-fit mx-auto hover:bg-orange-600 transition-colors"
			>
				Read more
			</Link>
		</article>
	);
}
