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

			<article className="bg-white p-8 space-y-6 text-[#495464] leading-relaxed rounded-xs shadow-sm border border-slate-100">
				<p className="text-sm italic">Last Updated: October 2023</p>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">1. Agreement to Terms</h2>
					<p>
						By accessing HiFi-Horizon, you agree to be bound by these Terms of
						Service and all applicable laws and regulations in the United
						Kingdom. These terms constitute a legally binding agreement between
						you and HiFi-Horizon.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">2. Products and Pricing</h2>
					<p>
						We strive for total accuracy; however, HiFi-Horizon does not warrant
						that product descriptions or pricing are error-free. In the event of
						a pricing error, we reserve the right to cancel any orders placed at
						the incorrect price, even if the order has been confirmed and your
						payment method charged.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">
						3. Right to Cancel (UK Consumers)
					</h2>
					<p>
						Under the Consumer Contracts Regulations, you have the right to
						cancel your order within 14 days of receipt.
					</p>
					<ul className="list-disc ml-6 space-y-1">
						<li>
							Items must be returned in their original, pristine condition.
						</li>
						<li>
							<strong>Exclusions:</strong> Sealed audio recordings (Vinyl, CDs,
							Cassettes) cannot be returned once the seal is broken unless the
							media is defective.
						</li>
					</ul>
				</section>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">4. Delivery and Risk</h2>
					<p>
						While we aim to meet all estimated delivery dates, we are not liable
						for delays caused by third-party couriers. Risk of loss and title
						for items pass to you upon our delivery to the carrier.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">5. Limitation of Liability</h2>
					<p>
						HiFi-Horizon provides this site on an "as is" basis. We shall not be
						liable for any damages of any kind arising from the use of this
						site, including, but not limited to direct, indirect, incidental, or
						consequential losses.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">6. Governing Law</h2>
					<p>
						These terms are governed by and construed in accordance with the
						laws of England & Wales. You irrevocably submit to the exclusive
						jurisdiction of the courts in that location.
					</p>
				</section>
			</article>
		</main>
	);
}
