import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Heading, Text } from "@/components/ui/typography";

export const Route = createFileRoute("/privacy-policy")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="min-h-screen w-full px-4 md:px-8 pb-32">
			<div className="max-w-6xl mx-auto">
				<PageHeader>Privacy Policy</PageHeader>

				<article className="bg-white p-8 space-y-8 rounded-xs shadow-sm border border-gray-100">
					<section className="space-y-3">
						<Heading variant="h2">How We Use Your Data</Heading>
						<Text>
							At HiFi-Horizon, we are committed to protecting your privacy. We
							collect information (name, email, address, and payment details)
							solely to process your orders and provide a personalized shopping
							experience.
						</Text>
					</section>

					<section className="space-y-3 pt-4 border-t border-gray-100">
						<Heading variant="h2">Third-Party Disclosure</Heading>
						<Text>
							We do not sell, trade, or otherwise transfer your personally
							identifiable information to outside parties except for trusted
							third parties who assist us in operating our website (e.g.,
							payment processors like Stripe and shipping couriers).
						</Text>
					</section>

					<section className="space-y-3 pt-4 border-t border-gray-100">
						<Heading variant="h2">Cookies</Heading>
						<Text>
							We use cookies to help remember and process the items in your
							shopping cart and understand your preferences for future visits.
							You can choose to disable cookies through your browser settings.
						</Text>
					</section>

					<section className="space-y-3 pt-4 border-t border-gray-100">
						<Heading variant="h2">Your Rights (GDPR)</Heading>
						<Text>
							Under UK GDPR, you have the right to access, correct, or request
							the deletion of your personal data. To exercise these rights,
							please contact our support team.
						</Text>
					</section>

					<section className="space-y-3 pt-4 border-t border-gray-100">
						<Heading variant="h2">Contact Us</Heading>
						<Text>
							If there are any questions regarding this privacy policy, you may
							contact us at:{" "}
							<span className="font-bold">support@hifi-horizon.co.uk</span>
						</Text>
					</section>
				</article>
			</div>
		</main>
	);
}
