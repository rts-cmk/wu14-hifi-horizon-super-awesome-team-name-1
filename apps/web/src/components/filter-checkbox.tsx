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
			<div className="relative flex items-center">
				<input
					type="checkbox"
					id={id}
					checked={checked}
					onChange={onChange}
					className="w-5 h-5 rounded-sm border-2 border-gray-300 bg-white cursor-pointer appearance-none checked:bg-orange-500 checked:border-orange-500 transition-all"
				/>
				{checked && (
					<svg
						className="absolute w-3.5 h-3.5 text-white pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
						role="img"
						aria-label="Checked"
					>
						<title>Checked</title>
						<polyline points="20 6 9 17 4 12" />
					</svg>
				)}
			</div>
		</label>
	);
}
