interface ProductQuantitySelectorProps {
	quantity: number;
	stock: number;
	onDecrement: () => void;
	onIncrement: () => void;
}

export function ProductQuantitySelector({
	quantity,
	stock,
	onDecrement,
	onIncrement,
}: ProductQuantitySelectorProps) {
	return (
		<div className="flex items-center border border-gray-300 rounded-sm">
			<button
				type="button"
				onClick={onDecrement}
				disabled={quantity <= 1}
				className="px-4 py-2 text-xl text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
				aria-label="Decrease quantity"
			>
				−
			</button>
			<span className="px-4 py-2 text-lg font-medium min-w-12 text-center">
				{quantity}
			</span>
			<button
				type="button"
				onClick={onIncrement}
				disabled={quantity >= stock}
				className="px-4 py-2 text-xl text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
				aria-label="Increase quantity"
			>
				+
			</button>
		</div>
	);
}
