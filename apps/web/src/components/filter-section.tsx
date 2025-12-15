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
		<div className="mb-6 rounded-xs overflow-visible">
			<button
				type="button"
				onClick={onToggle}
				className="w-full relative z-10 flex items-center justify-between p-4 bg-[#E8E8E8] text-gray-800 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)] font-medium hover:text-gray-900 transition-colors"
			>
				<span>{title}</span>
				{expanded ? (
					<ChevronUp className="size-5 text-gray-600" />
				) : (
					<ChevronDown className="size-5 text-gray-600" />
				)}
			</button>
			{expanded && <div className="space-y-3 p-4 bg-[#E8E8E8] relative z-0">{children}</div>}
		</div>
	);
}
