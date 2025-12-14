import { cn } from "@/lib/utils";

interface Specification {
	label: string;
	value: string;
}

interface ProductSpecificationsProps {
	specifications: Specification[];
}

export function ProductSpecifications({
	specifications,
}: ProductSpecificationsProps) {
	if (!specifications?.length) return null;

	return (
		<section className="w-full bg-[#F5F5F5] py-12 max-w-7xl mx-auto">
			<div className="border-t border-gray-300 mb-12" />
			<div className="px-8 max-w-4xl">
				<h2 className="text-2xl font-bold text-black uppercase mb-8">
					Product Specifications
				</h2>
				<div className="max-w-2xl">
					{specifications.map((spec, index) => (
						<div
							key={spec.label}
							className={cn(
								"grid grid-cols-2",
								index % 2 === 0 ? "bg-[#E8E8E8]" : "bg-white",
							)}
						>
							<div className="py-3 px-6 font-semibold text-black">
								{spec.label}
							</div>
							<div className="py-3 px-6 text-black">{spec.value}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
