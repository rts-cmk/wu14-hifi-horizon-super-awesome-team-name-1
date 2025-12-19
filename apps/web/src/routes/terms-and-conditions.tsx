import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Heading, Text } from "@/components/ui/typography";

export const Route = createFileRoute("/terms-and-conditions")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="min-h-screen w-full px-4 md:px-8 pb-32">
			<div className="max-w-6xl mx-auto">
				<PageHeader>Terms and Conditions</PageHeader>

				<article className="bg-white p-8 space-y-8 rounded-xs shadow-sm border border-gray-100">
					<Text className="text-sm italic text-gray-400">
						Last Updated: December 2025
					</Text>

					<section className="space-y-3">
						<Heading variant="h2">1. Agreement to Terms</Heading>
						<Text>
							By accessing HiFi-Horizon, you agree to be bound by these Terms of
							Service and all applicable laws and regulations in the United
							Kingdom. These terms constitute a legally binding agreement
							between you and HiFi-Horizon.
						</Text>
					</section>

					<section className="space-y-3 pt-4 border-t border-gray-100">
						<Heading variant="h2">2. Products and Pricing</Heading>
						<Text>
							We strive for total accuracy; however, HiFi-Horizon does not
							warrant that product descriptions or pricing are error-free. In
							the event of a pricing error, we reserve the right to cancel any
							orders placed at the incorrect price, even if the order has been
							confirmed and your payment method charged.
						</Text>
					</section>

					<section className="space-y-3 pt-4 border-t border-gray-100">
						<Heading variant="h2">3. Right to Cancel (UK Consumers)</Heading>
						<Text>
							Under the Consumer Contracts Regulations, you have the right to
							cancel your order within 14 days of receipt.
						</Text>
						<ul className="list-disc ml-6 space-y-2 text-gray-700">
							<li>
								Items must be returned in their original, pristine condition.
							</li>
							<li>
								<span className="font-bold">Exclusions:</span> Sealed audio
								recordings (Vinyl, CDs, Cassettes) cannot be returned once the
								seal is broken unless the media is defective.
							</li>
						</ul>
					</section>

					<section className="space-y-3 pt-4 border-t border-gray-100">
						<Heading variant="h2">4. Delivery and Risk</Heading>
						<Text>
							While we aim to meet all estimated delivery dates, we are not
							liable for delays caused by third-party couriers. Risk of loss and
							title for items pass to you upon our delivery to the carrier.
						</Text>
					</section>

					<section className="space-y-3 pt-4 border-t border-gray-100">
						<Heading variant="h2">5. Limitation of Liability</Heading>
						<Text>
							HiFi-Horizon provides this site on an "as is" basis. We shall not
							be liable for any damages of any kind arising from the use of this
							site, including, but not limited to direct, indirect, incidental,
							or consequential losses.
						</Text>
					</section>

					<section className="space-y-3 pt-4 border-t border-gray-100">
						<Heading variant="h2">6. Governing Law</Heading>
						<Text>
							These terms are governed by and construed in accordance with the
							laws of England & Wales. You irrevocably submit to the exclusive
							jurisdiction of the courts in that location.
						</Text>
					</section>
				</article>
			</div>
		</main>
	);
}
