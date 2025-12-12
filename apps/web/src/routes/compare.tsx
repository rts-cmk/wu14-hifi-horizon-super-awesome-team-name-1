import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useComparisonStore } from "@/stores/comparison";

export const Route = createFileRoute("/compare")({
	component: CompareComponent,
});

function CompareComponent() {
	const { products, clearAll } = useComparisonStore();

	const allLabels = [
		...new Set(
			products.flatMap((p) => p.specifications?.map((s) => s.label) || []),
		),
	];

	const getSpecValue = (productId: number, label: string) => {
		const product = products.find((p) => p.id === productId);
		return (
			product?.specifications?.find((s) => s.label === label)?.value || "—"
		);
	};

	// Dynamic grid columns based on product count
	// First column (labels) is fixed 200px
	// Product columns are equal width (1fr)
	const gridCols =
		products.length === 2
			? "grid-cols-[200px_1fr_1fr]"
			: "grid-cols-[200px_1fr_1fr_1fr]";

	if (products.length < 2) {
		return (
			<main className="min-h-screen w-full px-4 py-10 md:px-8">
				<h1 className="text-3xl md:text-4xl text-[#495464] font-semibold uppercase mb-8">
					Product Comparison
				</h1>
				<div className="text-center py-20">
					<p className="text-gray-500 mb-4">
						You need at least 2 products to compare.
					</p>
					<Link
						to="/shop"
						search={{ category: undefined }}
						className="inline-block bg-orange-500 text-white px-6 py-3 rounded-sm hover:bg-orange-600 transition-colors"
					>
						Browse Products
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen w-full bg-[#F5F5F5] pb-32">
			<div className="px-4 py-6 md:px-8 md:py-10 max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-6 md:mb-8">
					<h1 className="text-2xl md:text-4xl text-[#495464] font-semibold uppercase">
						Product Comparison
					</h1>
					<button
						type="button"
						onClick={clearAll}
						className="text-gray-500 hover:text-gray-700 underline text-sm md:text-base"
					>
						Clear all
					</button>
				</div>

				{/* Scrollable Container for Table */}
				<div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
					<div className="overflow-x-auto">
						{/* Use a min-width to ensure columns don't get crushed on mobile */}
						<div className={cn("grid min-w-[800px]", gridCols)}>
							
							{/* Header Row */}
							<div className="p-4 border-b border-gray-200 bg-gray-50" />
							{products.map((product) => (
								<div
									key={product.id}
									className="p-6 text-center border-b border-l border-gray-200"
								>
									<div className="w-full h-32 flex items-center justify-center mb-4">
										{product.images?.[0] && (
											<img
												src={product.images[0].url}
												alt={product.images[0].alt || product.title}
												className="max-w-full max-h-full object-contain"
											/>
										)}
									</div>
									<h3 className="font-semibold text-black text-lg mb-1">
										{product.title}
									</h3>
									<p className="text-orange-500 font-bold">
										£{(product.price).toLocaleString("en-GB", { minimumFractionDigits: 2 })}
									</p>
								</div>
							))}

							{/* Specs Rows */}
							{allLabels.map((label, index) => (
								<div key={label} className="contents">
									<div
										className={cn(
											"p-4 font-semibold text-black border-r border-gray-200 flex items-center",
											index % 2 === 0 ? "bg-[#E8E8E8]" : "bg-white",
										)}
									>
										{label}
									</div>
									{products.map((product) => (
										<div
											key={product.id}
											className={cn(
												"p-4 text-center text-black border-l border-gray-200 flex items-center justify-center",
												index % 2 === 0 ? "bg-[#E8E8E8]" : "bg-white",
											)}
										>
											{getSpecValue(product.id, label)}
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
