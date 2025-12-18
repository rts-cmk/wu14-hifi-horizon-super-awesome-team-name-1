import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-semibold text-[#495464]", {
	variants: {
		variant: {
			h1: "text-4xl py-10 uppercase",
			h2: "text-black text-xl mb-4",
			h2uppercase: "text-black text-xl uppercase mb-4",
			h3: "text-black font-bold text-lg",
			h4: "text-orange-500 text-base font-normal",
		},
	},
	defaultVariants: {
		variant: "h1",
	},
});

interface HeadingProps
	extends HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof headingVariants> {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Heading({
	className,
	variant,
	as: Component = "h1",
	...props
}: HeadingProps) {
	return (
		<Component
			className={cn(headingVariants({ variant, className }))}
			{...props}
		/>
	);
}

const textVariants = cva("text-black text-base", {
	variants: {
		variant: {
			default: "leading-relaxed",
			muted: "text-gray-500",
			small: "text-sm",
			large: "text-lg",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

interface TextProps
	extends HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof textVariants> {
	as?: "p" | "span" | "div";
}

export function Text({
	className,
	variant,
	as: Component = "p",
	...props
}: TextProps) {
	return (
		<Component
			className={cn(textVariants({ variant, className }))}
			{...props}
		/>
	);
}
