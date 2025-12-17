export interface FilterOptions {
	brands: string[];
	colors: string[];
	categories: string[];
}

export interface ActiveFilters {
	brand: string | null;
	color: string | null;
	price: string | null;
	category: string | null;
}
