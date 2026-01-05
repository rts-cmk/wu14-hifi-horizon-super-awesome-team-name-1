export interface ColorOption {
	hex: string;
	name: string;
}

export interface FilterOptions {
	brands: string[];
	colors: ColorOption[];
	categories: string[];
}

export interface ActiveFilters {
	brand: string[] | null;
	color: string[] | null;
	price: string | null;
	category: string[] | null;
}
