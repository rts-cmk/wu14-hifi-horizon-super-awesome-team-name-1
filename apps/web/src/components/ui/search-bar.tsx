import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useNav } from "@/stores/navigation";

const searchBarVariants = cva(
	"md:hidden fixed left-0 right-0 bg-[#E8E8E8] z-30 border-t border-gray-200 transition-all duration-300",
	{
		variants: {
			open: {
				true: "bottom-16 opacity-100",
				false: "bottom-0 opacity-0 pointer-events-none",
			},
		},
		defaultVariants: {
			open: false,
		},
	},
);

interface SearchBarProps {
	className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
	const searchOpen = useNav((state) => state.searchOpen);

	return (
		<div className={cn(searchBarVariants({ open: searchOpen }), className)}>
			<div className="p-4">
				<div className="relative">
					<input
						type="search"
						placeholder="Search product..."
						className="w-full text-black placeholder:text-black"
					/>
				</div>
			</div>
		</div>
	);
}
