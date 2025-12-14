import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
	id: number;
	title: string;
	brand: string;
	price: number;
	stock: number;
	images: { id: number; url: string; alt: string | null }[];
	quantity: number;
	color?: string;
}

interface CartStore {
	items: CartProduct[];
	addItem: (
		product: Omit<CartProduct, "quantity"> & { quantity?: number },
	) => void;
	removeItem: (id: number) => void;
	updateQuantity: (id: number, quantity: number) => void;
	clearCart: () => void;
	total: () => number;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (product) => {
				const { items } = get();
				const existingItem = items.find((i) => i.id === product.id);
				if (existingItem) {
					const newQuantity = existingItem.quantity + (product.quantity || 1);
					if (newQuantity <= existingItem.stock) {
						set({
							items: items.map((i) =>
								i.id === product.id ? { ...i, quantity: newQuantity } : i,
							),
						});
					}
				} else {
					set({
						items: [...items, { ...product, quantity: product.quantity || 1 }],
					});
				}
			},
			removeItem: (id) => {
				set({ items: get().items.filter((i) => i.id !== id) });
			},
			updateQuantity: (id, quantity) => {
				if (quantity <= 0) return;
				set({
					items: get().items.map((i) =>
						i.id === id ? { ...i, quantity: Math.min(i.stock, quantity) } : i,
					),
				});
			},
			clearCart: () => set({ items: [] }),
			total: () =>
				get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
		}),
		{ name: "shopping-cart" },
	),
);
