import { useSearch } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import { ProductSearchInput } from "@/components/product-search-input";
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
	const { searchOpen, close } = useNav();

	const searchParams = useSearch({ strict: false });
	const initialQuery = searchParams?.search || "";
	const [key, setKey] = useState(0);

	useEffect(() => {
		if (searchOpen) {
			setKey((prev) => prev + 1);
		}
	}, [searchOpen]);

	return (
		<div className={cn(searchBarVariants({ open: searchOpen }), className)}>
			<div className="p-4">
				<ProductSearchInput
					key={key}
					variant="mobile"
					initialQuery={initialQuery}
					onClose={() => close("searchOpen")}
				/>
			</div>
		</div>
	);
}
