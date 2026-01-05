import { useId, useState } from "react";
import { PRICE_RANGE_LABELS } from "@/constants/price-ranges";
import type { FilterOptions } from "@/types/filters";
import { FilterCheckbox } from "./filter-checkbox";
import { FilterRadio } from "./filter-radio";
import { FilterSection } from "./filter-section";

export interface ShopFiltersState {
	brand: string[] | null;
	color: string[] | null;
	price: string | null;
	category: string[] | null;
}

interface ShopFiltersProps {
	filters: ShopFiltersState;
	onFiltersChange: (filters: ShopFiltersState) => void;
	options: FilterOptions;
}

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

	const toggleMultiFilter = (key: keyof ShopFiltersState, value: string) => {
		const currentValues = (filters[key] as string[]) || [];
		const newValues = currentValues.includes(value)
			? currentValues.filter((v) => v !== value)
			: [...currentValues, value];

		onFiltersChange({
			...filters,
			[key]: newValues.length > 0 ? newValues : null,
		});
	};

	const setSingleFilter = (key: keyof ShopFiltersState, value: string) => {
		onFiltersChange({
			...filters,
			[key]: filters[key] === value ? null : value,
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
						<FilterCheckbox
							key={category}
							id={`${instanceId}-category-${category}`}
							label={category}
							checked={filters.category?.includes(category) || false}
							onChange={() => toggleMultiFilter("category", category)}
						/>
					))}
				</FilterSection>

				<FilterSection
					title="Brand"
					expanded={expandedSections.brand}
					onToggle={() => toggleSection("brand")}
				>
					{options.brands.map((brand) => (
						<FilterCheckbox
							key={brand}
							id={`${instanceId}-brand-${brand}`}
							label={brand}
							checked={filters.brand?.includes(brand) || false}
							onChange={() => toggleMultiFilter("brand", brand)}
						/>
					))}
				</FilterSection>

				<FilterSection
					title="Color"
					expanded={expandedSections.color}
					onToggle={() => toggleSection("color")}
				>
					{options.colors.map((color) => (
						<FilterCheckbox
							key={color.hex}
							id={`${instanceId}-color-${color.hex}`}
							label={
								<div className="flex items-center gap-2">
									<div
										className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
										style={{ backgroundColor: color.hex }}
									/>
									<span className="text-sm">{color.name}</span>
								</div>
							}
							checked={filters.color?.includes(color.name) || false}
							onChange={() => toggleMultiFilter("color", color.name)}
						/>
					))}
				</FilterSection>

				<FilterSection
					title="Price"
					expanded={expandedSections.price}
					onToggle={() => toggleSection("price")}
				>
					{PRICE_RANGE_LABELS.map((price) => (
						<FilterRadio
							key={price}
							name={`${instanceId}-price-filter`}
							value={price}
							label={price}
							checked={filters.price === price}
							onChange={() => {}} // no-op, we use onClick for toggling
							onClick={() => setSingleFilter("price", price)}
						/>
					))}
				</FilterSection>
			</section>
		</aside>
	);
}
