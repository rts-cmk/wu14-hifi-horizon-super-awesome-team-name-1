import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSectionProps {
	title: string;
	expanded: boolean;
	onToggle: () => void;
	children: React.ReactNode;
}

export function FilterSection({
	title,
	expanded,
	onToggle,
	children,
}: FilterSectionProps) {
	return (
		<div className="mb-6">
			<button
				type="button"
				onClick={onToggle}
				className="w-full flex items-center justify-between py-2 text-gray-800 font-medium hover:text-gray-900 transition-colors"
			>
				<span>{title}</span>
				{expanded ? (
					<ChevronUp className="size-5 text-gray-600" />
				) : (
					<ChevronDown className="size-5 text-gray-600" />
				)}
			</button>
			{expanded && <div className="mt-3 space-y-3">{children}</div>}
		</div>
	);
}
