import { cn } from "@/lib/utils";

interface ProductColorSelectorProps {
	colors: string[];
	selectedColor: string;
	onColorSelect: (color: string) => void;
}

export function ProductColorSelector({
	colors,
	selectedColor,
	onColorSelect,
}: ProductColorSelectorProps) {
	if (!colors?.length) return null;

	return (
		<div className="flex items-center gap-3">
			{colors.map((color) => (
				<button
					key={color}
					type="button"
					onClick={() => onColorSelect(color)}
					className={cn(
						"size-8 rounded-full border-2 transition-all",
						selectedColor === color
							? "ring-2 ring-offset-2 ring-gray-900 border-gray-900"
							: "border-gray-300 hover:border-gray-400",
					)}
					style={{ backgroundColor: color }}
					aria-label={`Select color ${color}`}
				/>
			))}
		</div>
	);
}

