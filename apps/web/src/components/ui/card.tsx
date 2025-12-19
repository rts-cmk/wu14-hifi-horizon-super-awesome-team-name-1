import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva("bg-white", {
	variants: {
		variant: {
			default: "shadow-sm rounded-sm",
			product: "shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] rounded-xs",
			border: "border border-gray-200 rounded-lg",
		},
		padding: {
			none: "p-0",
			sm: "p-4",
			md: "p-6",
			lg: "p-8",
		},
	},
	defaultVariants: {
		variant: "default",
		padding: "md",
	},
});

interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {}

export function Card({ className, variant, padding, ...props }: CardProps) {
	return (
		<div
			className={cn(cardVariants({ variant, padding, className }))}
			{...props}
		/>
	);
}
