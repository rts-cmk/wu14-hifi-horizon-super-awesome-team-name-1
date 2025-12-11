import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { useEscapeKey } from "@/hooks/use-escape-key";
import { cn } from "@/lib/utils";

const drawerVariants = cva(
	"fixed top-0 h-full z-50 w-full max-w-full md:max-w-md shadow-2xl overflow-y-auto transition-transform duration-300 ease-out",
	{
		variants: {
			side: {
				left: "left-0",
				right: "right-0",
			},
			open: {
				true: "translate-x-0",
				false: "",
			},
		},
		compoundVariants: [
			{
				side: "left",
				open: false,
				className: "-translate-x-full",
			},
			{
				side: "right",
				open: false,
				className: "translate-x-full",
			},
		],
		defaultVariants: {
			side: "right",
			open: false,
		},
	},
);

const backdropVariants = cva(
	"fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
	{
		variants: {
			open: {
				true: "opacity-100",
				false: "opacity-0 pointer-events-none",
			},
		},
		defaultVariants: {
			open: false,
		},
	},
);

interface DrawerProps {
	open: boolean;
	onClose: () => void;
	side: "left" | "right";
	children: ReactNode;
	className?: string;
}

export function Drawer({
	open,
	onClose,
	side,
	children,
	className,
}: DrawerProps) {
	useEscapeKey(onClose, open);

	return (
		<>
			<div
				className={backdropVariants({ open })}
				onClick={onClose}
				aria-hidden="true"
			/>
			<aside
				className={cn(drawerVariants({ side, open }), className)}
				aria-modal="true"
				role="dialog"
			>
				{children}
			</aside>
		</>
	);
}
