import { Link, useNavigate } from "@tanstack/react-router";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { getApiUrl } from "@/lib/get-api-url";
import type { Product } from "@/types/product";

interface ProductSearchInputProps {
	className?: string;
	onClose?: () => void;
	initialQuery?: string;
	variant?: "desktop" | "mobile";
}

export function ProductSearchInput({
	className,
	onClose,
	initialQuery = "",
	variant = "desktop",
}: ProductSearchInputProps) {
	const navigate = useNavigate();
	const [query, setQuery] = useState(initialQuery);
	const [debouncedQuery, setDebouncedQuery] = useState(query);
	const [products, setProducts] = useState<Product[]>([]);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch(getApiUrl("/api/products"));
				if (response.ok) {
					const data = await response.json();
					setProducts(data);
				}
			} catch (error) {
				console.error("Failed to fetch products for search", error);
			}
		}

		fetchProducts();
	}, []);

	useEffect(() => {
		setQuery(initialQuery);
	}, [initialQuery]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(query);
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [query]);

	const searchResults = useMemo(() => {
		if (!debouncedQuery || !debouncedQuery.trim()) return [];

		const fuse = new Fuse(products, {
			keys: ["title", "brand"],
			threshold: 0.4,
			ignoreLocation: true,
		});

		return fuse
			.search(debouncedQuery)
			.map((r) => r.item)
			.slice(0, 3);
	}, [debouncedQuery, products]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
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
			if (onClose) onClose();
			(e.target as HTMLInputElement).blur();
		}
	};

	const dropdownClasses =
		variant === "mobile" ? "bottom-full mb-2" : "top-full mt-2";

	return (
		<div className={cn("relative", className)}>
			<div className="relative">
				<input
					type="search"
					placeholder="Search product..."
					className={cn(
						"w-full text-black placeholder:text-gray-500 focus:outline-none transition-all",
						variant === "mobile"
							? "bg-transparent border-b border-gray-500 p-2"
							: "bg-white px-4 py-2 pr-10 rounded-xs w-64 shadow-none border border-transparent focus:border-gray-200",
					)}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => setIsFocused(true)}
					onBlur={() => {
						setTimeout(() => setIsFocused(false), 200);
					}}
				/>
				{variant === "desktop" && (
					<Search className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
				)}
			</div>

			{isFocused && searchResults.length > 0 && (
				<div
					className={cn(
						"absolute left-0 right-0 bg-white shadow-lg rounded-sm overflow-hidden z-50",
						dropdownClasses,
					)}
				>
					{searchResults.map((product) => (
						<Link
							key={product.id}
							to="/shop/$productId"
							params={{ productId: product.id.toString() }}
							onClick={() => {
								if (onClose) onClose();
								setIsFocused(false);
							}}
							className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b last:border-b-0 border-gray-100 transition-colors"
						>
							<figure className="w-10 h-10 shrink-0 bg-gray-100 rounded-sm overflow-hidden">
								<img
									src={product.images[0]?.url}
									alt={product.title}
									className="w-full h-full object-cover"
								/>
							</figure>
							<div className="flex flex-col flex-1 min-w-0 text-left">
								<span className="text-sm font-medium truncate text-gray-900">
									{product.title}
								</span>
								<span className="text-sm text-orange-500 font-semibold">
									{formatPrice(product.price)}
								</span>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
