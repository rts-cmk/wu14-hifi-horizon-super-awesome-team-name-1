import { create } from "zustand";

interface NavigationState {
	menuOpen: boolean;
	searchOpen: boolean;
	cartOpen: boolean;
	shopOpen: boolean;
	toggle: (
		key: keyof Omit<NavigationState, "toggle" | "close" | "closeAll">,
	) => void;
	close: (
		key: keyof Omit<NavigationState, "toggle" | "close" | "closeAll">,
	) => void;
	closeAll: () => void;
}

export const useNav = create<NavigationState>((set) => ({
	menuOpen: false,
	searchOpen: false,
	cartOpen: false,
	shopOpen: false,
	toggle: (key) => set((state) => ({ [key]: !state[key] })),
	close: (key) => set({ [key]: false }),
	closeAll: () =>
		set({
			menuOpen: false,
			searchOpen: false,
			cartOpen: false,
			shopOpen: false,
		}),
}));
