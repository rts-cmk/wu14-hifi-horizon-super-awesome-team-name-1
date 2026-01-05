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
		<div className="flex flex-wrap gap-x-6 gap-y-4">
			{colors.map((color) => (
				<div key={color.id} className="flex flex-col items-center gap-2">
					<button
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
					<span className="text-sm text-gray-600 font-medium">
						{color.name}
					</span>
				</div>
			))}
		</div>
	);
}
