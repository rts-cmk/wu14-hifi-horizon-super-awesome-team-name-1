import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CheckoutState {
	formData: {
		fullName: string;
		zipCode: string;
		city: string;
		address: string;
		email: string;
		phone: string;
		newsletter: boolean;
		terms: boolean;
	};
	deliveryMethod: "home" | "collect" | "post";
	paymentMethod: "card" | "paypal" | "apple";
	setFormData: (data: Partial<CheckoutState["formData"]>) => void;
	setDeliveryMethod: (method: CheckoutState["deliveryMethod"]) => void;
	setPaymentMethod: (method: CheckoutState["paymentMethod"]) => void;
	reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
	persist(
		(set) => ({
			formData: {
				fullName: "",
				zipCode: "",
				city: "",
				address: "",
				email: "",
				phone: "",
				newsletter: false,
				terms: false,
			},
			deliveryMethod: "home",
			paymentMethod: "card",
			setFormData: (data) =>
				set((state) => ({ formData: { ...state.formData, ...data } })),
			setDeliveryMethod: (method) => set({ deliveryMethod: method }),
			setPaymentMethod: (method) => set({ paymentMethod: method }),
			reset: () =>
				set({
					formData: {
						fullName: "",
						zipCode: "",
						city: "",
						address: "",
						email: "",
						phone: "",
						newsletter: false,
						terms: false,
					},
					deliveryMethod: "home",
					paymentMethod: "card",
				}),
		}),
		{
			name: "checkout-storage",
		},
	),
);
