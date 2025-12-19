import { cn } from "@/lib/utils";

interface Tab {
	id: string;
	label: string;
}

interface TabsProps {
	tabs: Tab[];
	activeTab: string;
	onTabChange: (id: string) => void;
	className?: string;
	variant?: "pills" | "underline";
}

export function Tabs({
	tabs,
	activeTab,
	onTabChange,
	className,
	variant = "pills",
}: TabsProps) {
	return (
		<div
			className={cn(
				"flex w-full overflow-hidden",
				variant === "pills" && "rounded-t-sm",
				variant === "underline" && "border-b border-gray-200",
				className,
			)}
		>
			{tabs.map((tab) => {
				const isActive = tab.id === activeTab;
				return (
					<button
						key={tab.id}
						type="button"
						onClick={() => onTabChange(tab.id)}
						className={cn(
							"flex-1 py-4 text-xl font-medium transition-colors border-none outline-none",
							variant === "pills" &&
								(isActive
									? "bg-[#495464] text-white"
									: "bg-[#E8E8E8] text-black hover:bg-gray-200"),
							variant === "underline" &&
								"bg-transparent flex-none px-8 py-3 text-base border-b-2 -mb-px",
							variant === "underline" &&
								(isActive
									? "border-orange-500 text-orange-600"
									: "border-transparent text-gray-500 hover:text-gray-700"),
						)}
					>
						{tab.label}
					</button>
				);
			})}
		</div>
	);
}
