import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useNav } from "@/stores/navigation";

const categories = [
	"CD Players",
	"DVD Players",
	"Preamps",
	"Speakers",
	"Turntables",
	"Integrated Amplifiers",
	"Power Amplifiers",
	"Tube Amplifiers",
] as const;

interface ShopDropdownProps {
	className?: string;
}

export function ShopDropdown({ className }: ShopDropdownProps) {
	const { close } = useNav();

	return (
		<div
			className={cn(
				"absolute top-full left-0 mt-2 bg-white text-black rounded-md shadow-xl py-4 w-64 z-50",
				className,
			)}
		>
			<h3 className="px-4 font-bold text-lg mb-2">Browse Categories</h3>
			<nav>
				{categories.map((category) => (
					<Link
						key={category}
						to="/"
						onClick={() => close("shopOpen")}
						className="block px-4 py-2 text-amber-700 hover:bg-gray-100 hover:text-amber-900 transition-colors"
					>
						{category}
					</Link>
				))}
			</nav>
		</div>
	);
}
