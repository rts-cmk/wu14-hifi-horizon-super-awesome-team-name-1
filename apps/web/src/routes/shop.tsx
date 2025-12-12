import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shop")({
	component: ShopComponent,
	validateSearch: (search: Record<string, unknown>) => ({
		category: typeof search.category === "string" ? search.category : undefined,
	}),
});

function ShopComponent() {
	const { category } = Route.useSearch();

	return (
		<main className="min-h-screen w-full max-w-6xl mx-auto px-8 py-10">
			<h1 className="text-4xl text-[#495464] font-semibold mb-8">Shop</h1>
			{category && (
				<p className="text-lg text-gray-700 mb-4">
					Category: <span className="font-semibold">{category}</span>
				</p>
			)}
		</main>
	);
}
