export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	inStock: boolean;
}

export const mockCartItems: CartItem[] = [
	{
		id: 1,
		name: "Auralic Aries G2.1 Streamer",
		price: 4799.0,
		quantity: 1,
		inStock: true,
	},
	{
		id: 2,
		name: "Auralic Aries G2.1 Streamer",
		price: 4799.0,
		quantity: 1,
		inStock: true,
	},
];
