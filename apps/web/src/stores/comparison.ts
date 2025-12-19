import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CompareProduct {
	id: number;
	title: string;
	price: number;
	images: { id: number; url: string; alt: string | null }[];
	specifications: { label: string; value: string }[];
}

interface ComparisonStore {
	products: CompareProduct[];
	addProduct: (product: CompareProduct) => void;
	removeProduct: (id: number) => void;
	clearAll: () => void;
	isInComparison: (id: number) => boolean;
}

export const useComparisonStore = create<ComparisonStore>()(
	persist(
		(set, get) => ({
			products: [],
			addProduct: (product) => {
				const { products } = get();
				if (products.length >= 3) return;
				if (products.some((p) => p.id === product.id)) return;
				set({ products: [...products, product] });
			},
			removeProduct: (id) => {
				set({ products: get().products.filter((p) => p.id !== id) });
			},
			clearAll: () => set({ products: [] }),
			isInComparison: (id) => get().products.some((p) => p.id === id),
		}),
		{ name: "product-comparison" },
	),
);
