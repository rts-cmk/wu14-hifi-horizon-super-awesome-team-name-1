import Fuse from "fuse.js";
import { useMemo } from "react";
import { getPriceRangeByLabel } from "@/constants/price-ranges";
import type { ActiveFilters, FilterOptions } from "@/types/filters";
import type { Product } from "@/types/product";

interface UseProductSearchResult {
	filteredProducts: Product[];
	availableFilters: FilterOptions;
}

export function useProductSearch(
	products: Product[],
	searchQuery: string,
	filters: ActiveFilters,
): UseProductSearchResult {
	const fuse = useMemo(() => {
		return new Fuse(products, {
			keys: ["title", "brand"],
			threshold: 0.4,
			ignoreLocation: true,
		});
	}, [products]);

	const availableFilters = useMemo(() => {
		const brands = Array.from(
			new Set(products.map((p) => p.brand).filter(Boolean)),
		).sort();

		const colors = Array.from(
			new Set(products.flatMap((p) => p.colors || []).filter(Boolean)),
		).sort();

		const categories = Array.from(
			new Set(
				products.map((p) => p.category).filter((c): c is string => Boolean(c)),
			),
		).sort();

		return { brands, colors, categories };
	}, [products]);

	const filteredProducts = useMemo(() => {
		let result = products;

		if (searchQuery.trim()) {
			result = fuse.search(searchQuery).map((r) => r.item);
		}
		if (filters.category) {
			result = result.filter((p) => p.category === filters.category);
		}

		if (filters.brand) {
			result = result.filter((p) => p.brand === filters.brand);
		}

		if (filters.color) {
			const colorFilter = filters.color;
			result = result.filter((p) => p.colors?.includes(colorFilter));
		}

		if (filters.price) {
			const priceRange = getPriceRangeByLabel(filters.price);
			if (priceRange) {
				result = result.filter((p) => priceRange.test(p.price));
			}
		}

		return result;
	}, [products, searchQuery, filters, fuse]);

	return {
		filteredProducts,
		availableFilters,
	};
}
