export const PRICE_RANGES = {
	UNDER_500: {
		label: "Under £500",
		min: 0,
		max: 500,
		test: (price: number) => price < 500,
	},
	RANGE_500_1000: {
		label: "£500 - £1,000",
		min: 500,
		max: 1000,
		test: (price: number) => price >= 500 && price <= 1000,
	},
	RANGE_1000_2500: {
		label: "£1,000 - £2,500",
		min: 1000,
		max: 2500,
		test: (price: number) => price >= 1000 && price <= 2500,
	},
	RANGE_2500_5000: {
		label: "£2,500 - £5,000",
		min: 2500,
		max: 5000,
		test: (price: number) => price >= 2500 && price <= 5000,
	},
	OVER_5000: {
		label: "Over £5,000",
		min: 5000,
		max: Number.POSITIVE_INFINITY,
		test: (price: number) => price > 5000,
	},
} as const;

export function getPriceRangeByLabel(label: string) {
	return Object.values(PRICE_RANGES).find((range) => range.label === label);
}

export const PRICE_RANGE_LABELS = Object.values(PRICE_RANGES).map(
	(range) => range.label,
);
