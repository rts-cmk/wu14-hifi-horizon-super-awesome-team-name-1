import { cn } from "@/lib/utils";

interface Color {
	id: number;
	hex: string;
	name: string;
}

interface ProductColorSelectorProps {
	colors: Color[];
	selectedColor: string;
	onColorSelect: (colorName: string) => void;
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
					key={color.id}
					type="button"
					onClick={() => onColorSelect(color.name)}
					className={cn(
						"size-8 rounded-full border-2 transition-all",
						selectedColor === color.name
							? "ring-2 ring-offset-2 ring-gray-900 border-gray-900"
							: "border-gray-300 hover:border-gray-400",
					)}
					style={{ backgroundColor: color.hex }}
					aria-label={`Select ${color.name}`}
					title={color.name}
				/>
			))}
		</div>
	);
}
