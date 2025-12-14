import { Link } from "@tanstack/react-router";
import { CreditCard, Receipt, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutStepperProps {
	currentStep: "cart" | "payment" | "receipt";
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
	const steps = [
		{ id: "cart", label: "Cart", icon: ShoppingCart, href: "/cart" },
		{ id: "payment", label: "Payment", icon: CreditCard, href: "/payment" },
		{ id: "receipt", label: "Receipt", icon: Receipt, href: "/receipt" },
	] as const;

	const currentIndex = steps.findIndex((step) => step.id === currentStep);

	return (
		<div className="flex items-center justify-center mb-12">
			<div className="flex items-center">
				{steps.map((step, index) => {
					const Icon = step.icon;
					const isActive = step.id === currentStep;

					return (
						<div key={step.id} className="flex items-center">
							<div className="relative group">
								{index <= currentIndex ? (
									<Link
										to={step.href as any}
										disabled={index === currentIndex}
										className={cn(
											"w-16 h-16 flex items-center justify-center rounded-sm shadow-sm transition-colors z-10 relative",
											isActive
												? "bg-[#495464] text-white"
												: "bg-[#E8E8E8] text-[#495464] hover:bg-gray-200",
										)}
									>
										<Icon className="size-8" />
									</Link>
								) : (
									<div
										className={cn(
											"w-16 h-16 flex items-center justify-center rounded-sm shadow-sm transition-colors z-10 relative bg-[#E8E8E8] text-[#495464] opacity-50 cursor-not-allowed",
										)}
									>
										<Icon className="size-8" />
									</div>
								)}
							</div>

							{index < steps.length - 1 && (
								<div
									className={cn(
										"w-16 h-3 -ml-1 -mr-1 z-0 relative transition-colors",
										index < currentIndex ? "bg-[#495464]" : "bg-[#E8E8E8]",
									)}
								/>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
