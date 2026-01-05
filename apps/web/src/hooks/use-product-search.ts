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

		const colorMap = new Map<string, { hex: string; name: string }>();
		for (const product of products) {
			for (const color of product.colors || []) {
				// safety check: ensure color has required fields
				if (color?.name && color?.hex && !colorMap.has(color.name)) {
					colorMap.set(color.name, { hex: color.hex, name: color.name });
				}
			}
		}
		const colors = Array.from(colorMap.values()).sort((a, b) =>
			a.name.localeCompare(b.name),
		);

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
		if (filters.category && filters.category.length > 0) {
			result = result.filter(
				(p) => p.category && filters.category?.includes(p.category),
			);
		}

		if (filters.brand && filters.brand.length > 0) {
			result = result.filter((p) => filters.brand?.includes(p.brand));
		}

		if (filters.color && filters.color.length > 0) {
			result = result.filter((p) =>
				p.colors?.some((c) => filters.color?.includes(c.name)),
			);
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
