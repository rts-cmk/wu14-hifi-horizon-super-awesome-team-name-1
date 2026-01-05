interface FilterCheckboxProps {
	id: string;
	label: React.ReactNode;
	checked: boolean;
	onChange: () => void;
}

export function FilterCheckbox({
	id,
	label,
	checked,
	onChange,
}: FilterCheckboxProps) {
	return (
		<label
			htmlFor={id}
			className="flex items-center justify-between cursor-pointer group"
		>
			<span className="text-gray-700 text-base group-hover:text-black transition-colors">
				{label}
			</span>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				onChange={onChange}
				className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white cursor-pointer appearance-none checked:bg-white checked:border-gray-300 relative checked:after:content-['✓'] checked:after:text-green-700 checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-sm checked:after:font-bold transition-all"
			/>
		</label>
	);
}
