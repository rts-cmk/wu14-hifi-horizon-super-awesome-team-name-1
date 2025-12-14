import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageCarouselProps {
	images: { id: number; url: string; alt: string | null }[];
	productTitle: string;
}

export function ProductImageCarousel({
	images = [],
	productTitle,
}: ProductImageCarouselProps) {
	const [index, setIndex] = useState(0);
	const hasMultiple = images.length > 1;

	return (
		<div className="flex flex-col items-center">
			<div className="relative w-full max-w-lg flex items-center justify-center">
				<button
					type="button"
					onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
					disabled={!hasMultiple}
					className="absolute left-0 -translate-x-full p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
					aria-label="Previous image"
				>
					<ChevronLeft className="size-10" strokeWidth={1.5} />
				</button>

				<div className="p-6 w-full aspect-4/3 flex items-center justify-center">
					{images.length > 0 ? (
						<img
							src={images[index]?.url}
							alt={images[index]?.alt || productTitle}
							className="max-w-full max-h-full object-contain"
						/>
					) : (
						<div className="text-gray-400">No image available</div>
					)}
				</div>

				<button
					type="button"
					onClick={() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
					disabled={!hasMultiple}
					className="absolute right-0 translate-x-full p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
					aria-label="Next image"
				>
					<ChevronRight className="size-10" strokeWidth={1.5} />
				</button>
			</div>

			{hasMultiple && (
				<div className="flex gap-2 mt-4">
					{images.map((image, i) => (
						<button
							key={image.id}
							type="button"
							onClick={() => setIndex(i)}
							className={cn(
								"size-3 rounded-full transition-colors",
								i === index ? "bg-gray-700" : "bg-gray-300 hover:bg-gray-400",
							)}
							aria-label={`Go to image ${i + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
