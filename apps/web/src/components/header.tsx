import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { CartDrawer } from "@/components/cart-drawer";
import { MenuDrawer } from "@/components/menu-drawer";
import { ProductSearchInput } from "@/components/product-search-input";
import { SearchBar } from "@/components/search-bar";
import { ShopDropdown } from "@/components/shop-dropdown";
import { useCartStore } from "@/stores/cart";
import { useNav } from "@/stores/navigation";

export default function Header() {
	const { menuOpen, cartOpen, toggle, close } = useNav();
	const { items } = useCartStore();
	const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<header>
			<nav className="hidden md:flex items-center justify-between bg-black text-white px-8 py-4">
				<div className="flex items-center gap-8">
					<Link to="/" aria-label="HIFI Home">
						<figure>
							<img src="/logo.svg" alt="HIFI Horizon" className="h-10" />
						</figure>
					</Link>

					<div className="flex items-center gap-6">
						<div className="relative group">
							<Link
								to="/shop"
								className="text-white hover:text-gray-300 text-base md:text-lg font-medium"
							>
								SHOP
							</Link>
							<div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
								<ShopDropdown />
							</div>
						</div>

						<Link
							to="/about"
							className="hover:text-gray-300 transition-colors font-medium"
						>
							ABOUT US
						</Link>

						<Link
							to="/contact"
							className="hover:text-gray-300 transition-colors font-medium"
						>
							CONTACT US
						</Link>
					</div>
				</div>

				<div className="flex items-center gap-6">
					<div className="relative">
						<ProductSearchInput variant="desktop" />
					</div>

					<Link
						to="/profile"
						className="hover:text-gray-300 transition-colors"
						aria-label="Profile"
					>
						<User className="size-6" />
					</Link>

					<button
						type="button"
						onClick={() => toggle("cartOpen")}
						className="hover:text-gray-300 transition-colors relative"
						aria-label="Cart"
					>
						<ShoppingCart className="size-6" />
						{itemCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
								{itemCount}
							</span>
						)}
					</button>
				</div>
			</nav>

			<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black z-40">
				<div className="flex items-center justify-around h-16">
					<button
						type="button"
						onClick={() => toggle("searchOpen")}
						className="flex flex-col items-center gap-1 text-white transition-colors p-2"
						aria-label="Search"
					>
						<Search className="size-6" />
					</button>

					<Link
						to="/profile"
						className="flex flex-col items-center gap-1 text-white transition-colors p-2"
						aria-label="Profile"
					>
						<User className="size-6" />
					</Link>

					<button
						type="button"
						onClick={() => toggle("cartOpen")}
						className="flex flex-col items-center gap-1 text-white transition-colors p-2 relative"
						aria-label="Cart"
					>
						<ShoppingCart className="size-6" />
						{itemCount > 0 && (
							<span className="absolute top-1 right-1 bg-orange-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
								{itemCount}
							</span>
						)}
					</button>

					<button
						type="button"
						onClick={() => toggle("menuOpen")}
						className="flex flex-col items-center gap-1 text-white transition-colors p-2"
						aria-label="Menu"
					>
						<Menu className="size-6" />
					</button>
				</div>
			</nav>

			<SearchBar />
			<MenuDrawer open={menuOpen} onClose={() => close("menuOpen")} />
			<CartDrawer open={cartOpen} onClose={() => close("cartOpen")} />
		</header>
	);
}
