export interface ProductImage {
	id: number;
	url: string;
	alt: string | null;
}

export interface ProductSpecification {
	label: string;
	value: string;
}

export interface Product {
	id: number;
	title: string;
	brand: string;
	colors: string[];
	price: number;
	category?: string;
	description?: string;
	descriptions?: string[];
	stock: number;
	images: ProductImage[];
	specifications?: ProductSpecification[];
}
