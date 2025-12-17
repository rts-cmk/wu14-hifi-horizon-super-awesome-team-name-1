import { useNavigate, useSearch } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
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
	const navigate = useNavigate();

	// loose strictness for global search access
	const searchParams = useSearch({ strict: false });
	const initialQuery = searchParams?.search || "";

	const [query, setQuery] = useState(initialQuery);

	// sync local state if URL changes externally (e.g. back button)
	useEffect(() => {
		if (searchOpen) {
			setQuery(initialQuery);
		}
	}, [initialQuery, searchOpen]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (query !== initialQuery) {
				navigate({
					to: "/shop",
					search: {
						search: query || undefined,
						brand: undefined,
						color: undefined,
						price: undefined,
						category: undefined,
					},
				});
			}
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [query, navigate, initialQuery]);

	return (
		<div className={cn(searchBarVariants({ open: searchOpen }), className)}>
			<div className="p-4">
				<div className="relative">
					<input
						type="search"
						placeholder="Search product..."
						className="w-full text-black placeholder:text-black bg-transparent border-b border-gray-500 focus:outline-none p-2"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}
