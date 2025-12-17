import { useId, useState } from "react";
import type { FilterOptions } from "@/types/filters";
import { FilterRadio } from "./filter-radio";
import { FilterSection } from "./filter-section";

export interface ShopFiltersState {
	brand: string | null;
	color: string | null;
	price: string | null;
	category: string | null;
}

interface ShopFiltersProps {
	filters: ShopFiltersState;
	onFiltersChange: (filters: ShopFiltersState) => void;
	options: FilterOptions;
}

const prices = [
	"Under £500",
	"£500 - £1,000",
	"£1,000 - £2,500",
	"£2,500 - £5,000",
	"Over £5,000",
];

export function ShopFilters({
	filters,
	onFiltersChange,
	options,
}: ShopFiltersProps) {
	const [expandedSections, setExpandedSections] = useState({
		category: true,
		brand: true,
		color: true,
		price: false,
	});
	const instanceId = useId();

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const updateFilter = (key: keyof ShopFiltersState, value: string) => {
		onFiltersChange({
			...filters,
			[key]: value,
		});
	};

	return (
		<aside>
			<h3 className="text-xl font-semibold text-gray-800 mb-6">Sort by</h3>

			<section className="w-[300px] shrink-0 h-fit rounded-xs">
				<FilterSection
					title="Category"
					expanded={expandedSections.category}
					onToggle={() => toggleSection("category")}
				>
					{options.categories.map((category) => (
						<FilterRadio
							key={category}
							name={`${instanceId}-category-filter`}
							value={category}
							label={category}
							checked={filters.category === category}
							onChange={() => updateFilter("category", category)}
						/>
					))}
				</FilterSection>

				<FilterSection
					title="Brand"
					expanded={expandedSections.brand}
					onToggle={() => toggleSection("brand")}
				>
					{options.brands.map((brand) => (
						<FilterRadio
							key={brand}
							name={`${instanceId}-brand-filter`}
							value={brand}
							label={brand}
							checked={filters.brand === brand}
							onChange={() => updateFilter("brand", brand)}
						/>
					))}
				</FilterSection>

				<FilterSection
					title="Color"
					expanded={expandedSections.color}
					onToggle={() => toggleSection("color")}
				>
					{options.colors.map((color) => {
						const isHex = /^#[0-9A-Fa-f]{6}$/.test(color);
						return (
							<FilterRadio
								key={color}
								name={`${instanceId}-color-filter`}
								value={color}
								label={
									isHex ? (
										<div className="flex items-center gap-2">
											<div
												className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
												style={{ backgroundColor: color }}
											/>
											<span className="uppercase text-sm ml-1">{color}</span>
										</div>
									) : (
										color
									)
								}
								checked={filters.color === color}
								onChange={() => updateFilter("color", color)}
							/>
						);
					})}
				</FilterSection>

				<FilterSection
					title="Price"
					expanded={expandedSections.price}
					onToggle={() => toggleSection("price")}
				>
					{prices.map((price) => (
						<FilterRadio
							key={price}
							name={`${instanceId}-price-filter`}
							value={price}
							label={price}
							checked={filters.price === price}
							onChange={() => updateFilter("price", price)}
						/>
					))}
				</FilterSection>
			</section>
		</aside>
	);
}
