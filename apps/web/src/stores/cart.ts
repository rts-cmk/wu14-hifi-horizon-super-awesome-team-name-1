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
	removeItem: (id: number, color?: string) => void;
	updateQuantity: (id: number, quantity: number, color?: string) => void;
	clearCart: () => void;
	total: () => number;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (product) => {
				const { items } = get();
				const existingItem = items.find(
					(i) => i.id === product.id && i.color === product.color,
				);
				if (existingItem) {
					const newQuantity = existingItem.quantity + (product.quantity || 1);
					if (newQuantity <= existingItem.stock) {
						set({
							items: items.map((i) =>
								i.id === product.id && i.color === product.color
									? { ...i, quantity: newQuantity }
									: i,
							),
						});
					}
				} else {
					set({
						items: [...items, { ...product, quantity: product.quantity || 1 }],
					});
				}
			},
			removeItem: (id, color) => {
				set({
					items: get().items.filter((i) => !(i.id === id && i.color === color)),
				});
			},
			updateQuantity: (id, quantity, color) => {
				if (quantity <= 0) return;
				set({
					items: get().items.map((i) =>
						i.id === id && i.color === color
							? { ...i, quantity: Math.min(i.stock, quantity) }
							: i,
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
