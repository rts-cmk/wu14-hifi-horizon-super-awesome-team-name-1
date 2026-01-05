import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

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
	return (
		<div
			className={cn(
				"absolute top-full left-0 mt-2 bg-white text-black rounded-xs py-4 w-64 z-50",
				className,
			)}
		>
			<h3 className="px-4 font-bold text-lg mb-2">Browse Categories</h3>
			<nav>
				{categories.map((category) => (
					<Link
						key={category}
						to="/shop"
						search={{
							category: [category],
						}}
						className="block px-4 py-2 hover:bg-gray-100 transition-colors"
					>
						{category}
					</Link>
				))}
			</nav>
		</div>
	);
}
