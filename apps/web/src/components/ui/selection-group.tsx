import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SelectionOption<T> {
	id: T;
	label: ReactNode;
}

interface SelectionGroupProps<T> {
	options: SelectionOption<T>[];
	selectedValue: T;
	onSelect: (value: T) => void;
	className?: string;
}

export function SelectionGroup<T extends string>({
	options,
	selectedValue,
	onSelect,
	className,
}: SelectionGroupProps<T>) {
	return (
		<div className={cn("flex flex-wrap gap-4", className)}>
			{options.map((option) => (
				<button
					key={option.id}
					type="button"
					onClick={() => onSelect(option.id)}
					className={cn(
						"px-6 py-2 rounded-sm text-sm font-medium border transition-colors",
						selectedValue === option.id
							? "bg-[#495464] text-white border-[#495464]"
							: "bg-white text-gray-500 border-gray-300 hover:border-gray-400",
					)}
				>
					{option.label}
				</button>
			))}
		</div>
	);
}
