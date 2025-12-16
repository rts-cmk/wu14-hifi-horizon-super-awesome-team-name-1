import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-and-conditions")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="min-h-[calc(100vh-4rem)] w-full max-w-6xl p-4 md:p-0 mx-auto">
			<h1 className="text-4xl text-[#495464] font-semibold py-10 uppercase">
				Terms of Service
			</h1>

			<article className="bg-white p-8 space-y-6 text-[#495464] leading-relaxed rounded-xs shadow-sm">
				<section className="space-y-2">
					<p>
						These Terms of Service apply to your use of HiFi-Horizon and any
						purchases made through the website. By accessing the site or placing
						an order, you agree to be bound by these terms. If you do not agree,
						you must not use the website.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">About HiFi-Horizon</p>
					<p>
						HiFi-Horizon is a UK-based online webshop selling music-related
						products, including physical music media, audio equipment, and
						accessories. All products are offered subject to availability.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Products and Pricing</p>
					<p>
						All prices are listed in GBP and include UK VAT unless stated
						otherwise. Shipping costs are shown at checkout. Product
						information, pricing, and availability may change at any time. We
						reserve the right to correct errors and cancel orders affected by
						incorrect pricing or information.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Orders and Payment</p>
					<p>
						Payment must be completed in full before an order is processed or
						dispatched. By placing an order, you confirm that the payment method
						used is authorised and that all provided information is accurate. We
						may refuse or cancel orders in cases of payment failure, suspected
						fraud, or misuse of the website.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Shipping and Delivery</p>
					<p>
						Orders are delivered to the address provided at checkout. Delivery
						times are estimates and not guaranteed. HiFi-Horizon is not
						responsible for delays caused by couriers, customs, or events beyond
						our control. Risk passes to you once the goods are delivered.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Returns and Cancellations</p>
					<p>
						You have the right to cancel your order within 14 days of receiving
						the goods, in line with UK consumer law. Items must be returned
						unused, in original packaging, and in a resalable condition. Sealed
						audio recordings that have been opened may not be eligible for
						return. Return shipping costs are your responsibility unless the
						item is faulty or incorrect.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Faulty or Damaged Goods</p>
					<p>
						If an item is faulty or damaged, you must contact us within a
						reasonable time. We will offer a repair, replacement, or refund in
						accordance with your statutory rights.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Intellectual Property</p>
					<p>
						All content on HiFi-Horizon, including text, images, logos, and
						product descriptions, is owned by or licensed to HiFi-Horizon. You
						may not copy, reproduce, or use any content without prior written
						permission.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Acceptable Use</p>
					<p>
						You must not misuse the website, attempt unauthorised access,
						interfere with its operation, or use it for unlawful purposes. We
						may suspend or terminate access if these terms are breached.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Liability</p>
					<p>
						To the fullest extent permitted by law, HiFi-Horizon is not liable
						for indirect or consequential losses. Our total liability is limited
						to the amount paid for the relevant order.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Governing Law</p>
					<p>
						These terms are governed by the laws of England and Wales. Any
						disputes are subject to the exclusive jurisdiction of the courts of
						England and Wales.
					</p>
				</section>

				<section className="space-y-2">
					<p className="font-semibold">Changes</p>
					<p>
						We may update these terms at any time. Continued use of the website
						after changes are made means you accept the updated terms.
					</p>
				</section>
			</article>
		</main>
	);
}
