import { useId, useState } from "react";
import { FilterRadio } from "./filter-radio";
import { FilterSection } from "./filter-section";

export interface ShopFiltersState {
	brand: string | null;
	color: string | null;
	price: string | null;
}

interface ShopFiltersProps {
	filters: ShopFiltersState;
	onFiltersChange: (filters: ShopFiltersState) => void;
}

const brands = ["Steelseries", "Logitech", "Apple"];
const colors = ["White", "Black", "Grey"];
const prices = [
	"Under £500",
	"£500 - £1,000",
	"£1,000 - £2,500",
	"£2,500 - £5,000",
	"Over £5,000",
];

export function ShopFilters({ filters, onFiltersChange }: ShopFiltersProps) {
	const [expandedSections, setExpandedSections] = useState({
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
					title="Brand"
					expanded={expandedSections.brand}
					onToggle={() => toggleSection("brand")}
				>
					{brands.map((brand) => (
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
					{colors.map((color) => (
						<FilterRadio
							key={color}
							name={`${instanceId}-color-filter`}
							value={color}
							label={color}
							checked={filters.color === color}
							onChange={() => updateFilter("color", color)}
						/>
					))}
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
