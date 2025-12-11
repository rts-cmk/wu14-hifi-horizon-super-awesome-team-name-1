import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Drawer } from "./drawer";

interface MenuDrawerProps {
	open: boolean;
	onClose: () => void;
	className?: string;
}

export function MenuDrawer({ open, onClose, className }: MenuDrawerProps) {
	return (
		<Drawer
			open={open}
			onClose={onClose}
			side="right"
			className={cn(className)}
		>
			<div className="flex flex-col h-full bg-black text-white p-8">
				<button
					type="button"
					onClick={onClose}
					className="self-end hover:text-gray-300 transition-colors"
					aria-label="Close menu"
				>
					<X className="size-6" />
				</button>

				<div className="flex-1 flex flex-col items-center justify-center gap-12">
					<Link to="/" aria-label="HIFI Home">
						<figure>
							<img src="/images/logo.svg" alt="HIFI Horizon" className="h-12" />
						</figure>
					</Link>

					<nav className="flex flex-col items-center gap-8 text-lg tracking-wide">
						<Link to="/" className="hover:text-gray-300 transition-colors">
							SHOP
						</Link>
						<Link to="/about" className="hover:text-gray-300 transition-colors">
							ABOUT US
						</Link>
						<Link
							to="/contact"
							className="hover:text-gray-300 transition-colors"
						>
							CONTACT US
						</Link>
					</nav>
				</div>
			</div>
		</Drawer>
	);
}
