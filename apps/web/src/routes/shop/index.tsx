import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShopFilters, type ShopFiltersState } from "@/components/shop-filters";

export const Route = createFileRoute("/shop/")({
	component: ShopComponent,
	validateSearch: (search: Record<string, unknown>) => ({
		category: typeof search.category === "string" ? search.category : undefined,
	}),
});

function ShopComponent() {
	const [filters, setFilters] = useState<ShopFiltersState>({
		brand: "Logitech",
		color: null,
		price: null,
	});

	return (
		<main className="min-h-screen w-full px-8 py-10">
			<h1 className="text-4xl text-[#495464] uppercase font-semibold mb-8">
				PRODUCTS
			</h1>
			<div className="flex gap-8">
				<ShopFilters filters={filters} onFiltersChange={setFilters} />

				<section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></section>
			</div>
		</main>
	);
}
