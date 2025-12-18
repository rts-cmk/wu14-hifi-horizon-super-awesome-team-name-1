import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	requiredIndicator?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, label, requiredIndicator, id, ...props }, ref) => {
		return (
			<div className="w-full">
				{label && (
					<label
						htmlFor={id}
						className="flex items-center gap-1 text-lg font-medium text-gray-700 mb-1"
					>
						{label}
						{requiredIndicator && (
							<span className="text-sm text-orange-500 font-semibold">*</span>
						)}
					</label>
				)}
				<input
					type={type}
					id={id}
					className={cn(
						"bg-[#E8E8E8] py-3 px-4 w-full shadow-[1px_2px_4px_0px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input };
