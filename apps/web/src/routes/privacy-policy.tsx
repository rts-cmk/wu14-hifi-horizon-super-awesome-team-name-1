import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="min-h-[calc(100vh-4rem)] w-full max-w-6xl p-4 md:p-0 mx-auto">
			<h1 className="text-4xl text-[#495464] font-semibold py-10 uppercase">
				Privacy Policy
			</h1>

			<article className="bg-white p-8 space-y-6 text-[#495464] leading-relaxed rounded-xs shadow-sm border border-slate-100">
				<section className="space-y-2">
					<h2 className="font-bold text-lg">How We Use Your Data</h2>
					<p>
						At HiFi-Horizon, we are committed to protecting your privacy. We
						collect information (name, email, address, and payment details)
						solely to process your orders and provide a personalized shopping
						experience.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">Third-Party Disclosure</h2>
					<p>
						We do not sell, trade, or otherwise transfer your personally
						identifiable information to outside parties except for trusted third
						parties who assist us in operating our website (e.g., payment
						processors like Stripe and shipping couriers).
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">Cookies</h2>
					<p>
						We use cookies to help remember and process the items in your
						shopping cart and understand your preferences for future visits. You
						can choose to disable cookies through your browser settings.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">Your Rights (GDPR)</h2>
					<p>
						Under UK GDPR, you have the right to access, correct, or request the
						deletion of your personal data. To exercise these rights, please
						contact our support team.
					</p>
				</section>

				<section className="space-y-2">
					<h2 className="font-bold text-lg">Contact Us</h2>
					<p>
						If there are any questions regarding this privacy policy, you may
						contact us at: <strong>support@hifi-horizon.co.uk</strong>
					</p>
				</section>
			</article>
		</main>
	);
}
