interface FilterRadioProps {
	name: string;
	value: string;
	label: string;
	checked: boolean;
	onChange: () => void;
}

export function FilterRadio({
	name,
	value,
	label,
	checked,
	onChange,
}: FilterRadioProps) {
	return (
		<label className="flex items-center justify-between cursor-pointer">
			<span className="text-gray-700 text-base">{label}</span>
			<input
				type="radio"
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
				className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white appearance-none checked:bg-white checked:border-gray-300 relative checked:after:content-['✓'] checked:after:text-green-700 checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-sm checked:after:font-bold"
			/>
		</label>
	);
}
