interface ProductStockIndicatorProps {
	stock: number;
}

export function ProductStockIndicator({ stock }: ProductStockIndicatorProps) {
	if (stock > 0) {
		return (
			<span className="flex items-center gap-2 text-gray-600">
				In stock
				<span className="size-3 bg-green-600 rounded-full" />
			</span>
		);
	}

	return (
		<span className="flex items-center gap-2 text-gray-600">
			Out of stock
			<span className="size-3 bg-red-600 rounded-full" />
		</span>
	);
}
