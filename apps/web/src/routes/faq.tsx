import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Heading, Text } from "@/components/ui/typography";

export const Route = createFileRoute("/faq")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="min-h-screen w-full px-4 md:px-8 pb-32">
			<div className="max-w-6xl mx-auto">
				<PageHeader>FAQ</PageHeader>

				<article className="bg-white p-8 space-y-6 shadow-sm border border-gray-100 rounded-xs">
					<div className="space-y-4">
						<Heading variant="h2">
							Here at HiFi Horizon, our trained product specialists aim to
							provide the right product for you. We take great care with all of
							our orders to ensure you are fully happy with the product.
						</Heading>
						<Text>
							We aim to resolve any problems to your satisfaction. Please
							contact us directly, if, for any reason, you have an issue with
							your order, your product or any other service provided.
						</Text>
					</div>

					<section className="space-y-4 pt-4">
						<Heading variant="h2uppercase">Our Guarantee</Heading>
						<Text>
							All items excluding ex-display and secondhand goods are covered by
							at least 12 months warranty; this is detailed on your receipt. Any
							secondhand or ex-display product is covered by at least 3 months
							warranty as noted in the original listing.
						</Text>
						<Text>
							HiFi Horizon cannot guarantee against any misuse (i.e. blown
							speakers etc.), commercial use, wear and tear, erosion of parts,
							loss of data stored on any form of writeable/hard drive devices,
							dead pixels of an amount not covered by the manufacturer’s
							specifications or where you have not allowed repairs of goods to
							be carried out by authorised agents.
						</Text>
						<Text>
							If it has been more than 30 days since you have received a product
							and discovered a fault, we will still repair the goods free of
							charge or, if you prefer, replace them provided that you report
							the fault within 12 months of purchase. If we are unable to repair
							or replace the item(s) we will provide you with a full refund
							instead.
						</Text>
						<Text>
							Please note that if it is after the initial 30 days of purchase
							you must be able to certify the fault was present upon delivery
							and not by misuse.
						</Text>
					</section>

					<section
						id="refunds"
						className="space-y-4 pt-4 border-t border-gray-100"
					>
						<Heading variant="h2uppercase">Refunds</Heading>
						<Text>
							Once your returned item is received and inspected, we will send
							you an email or phone call to notify you that we have received
							your returned item. We will also notify you of the approval or
							rejection of your refund.
						</Text>
						<Text>
							If you are approved, then your refund will be processed, and a
							credit will automatically be applied to your original method of
							payment, within 3 working days. Please note we require an email
							address or contact number to arrange a refund that was purchased
							over the phone.
						</Text>
						<Text>
							There are certain situations where only partial refunds are
							granted or we cannot refund you; Any item not in its original
							condition, is damaged or missing parts for reasons not due to our
							error. Any damage that has been caused by misuse, such as a
							speaker drive unit being blown or water being introduced to the
							unit, or that has been damaged due to poor packing. Any item that
							is returned more than 30 days after delivery. In any instance, we
							will notify you as soon as possible to resolve this matter.
						</Text>
						<Text>
							If you haven’t received a refund after confirmation, first check
							your bank account again. Then contact your credit card company, it
							may take some time before your refund is officially posted. Next
							contact your bank. There is often some processing time of a couple
							of days before a refund is posted. If you have done all of this
							and you still have not received your refund after 7 days, please
							contact us at{" "}
							<a
								href="mailto:sales@hifi-horizon.com"
								className="font-bold hover:underline"
							>
								sales@hifi-horizon.com
							</a>
							.
						</Text>
					</section>

					<section
						id="shipping"
						className="space-y-4 pt-4 border-t border-gray-100"
					>
						<Heading variant="h2uppercase">Shipping</Heading>
						<Text>
							To return your product, you should mail your product to: 2 Joppa
							Road, Mackenzie House, Edinburgh, EH15 2EU. If you would like to
							return an item, please note that we cannot arrange a collection of
							the item without additional cost; you will be responsible for
							ensuring the product reaches us.
						</Text>
						<Text>
							Shipping costs are non-refundable. If you receive a refund, the
							cost of return shipping will be deducted from your refund.
							Depending on where you live, the time it may take for your
							exchanged product to reach you may vary. We will process the
							refund when the item arrives with us.
						</Text>
						<Text>
							If you are shipping an item over £100, we would advise using a
							trackable shipping service or purchasing shipping insurance. We
							cannot guarantee that we will receive your returned item.
						</Text>
					</section>

					<section
						id="delivery"
						className="space-y-4 pt-4 border-t border-gray-100"
					>
						<Heading variant="h2uppercase">Delivery</Heading>
						<Text>
							Please check the condition of all products delivered as soon as
							they are received. This does not affect your statutory rights. If
							there is a problem we would like to deal with this as soon as
							possible to alleviate any inconvenience to yourself.
						</Text>
						<Text>
							As soon as we have delivered the goods to you, you will be
							responsible for them and any damage occasioned whilst in your
							possession. The majority of goods we send will require you to sign
							for them upon delivery.
						</Text>
						<Text>
							If you are not able to sign for a delivery, we will do our utmost
							to contact you to arrange when it is convenient to redeliver. Our
							responsibility for everything other than damage due to our
							negligence will end at the time the carrier tried to delivery the
							goods to you.
						</Text>
						<Text>
							If your product is visibly damaged in transit, please sign for the
							delivery as ‘damaged’ and let us know as soon as possible.
						</Text>
					</section>

					<section
						id="returns"
						className="space-y-4 pt-4 border-t border-gray-100"
					>
						<Heading variant="h2uppercase">
							Returns Process/Your Statutory Rights
						</Heading>
						<Text>
							If you wish to return goods purchased online or over the phone,
							you should notify HiFi Horizon of your intention to do so within
							14 days of the date of receipt.
						</Text>
						<Text>
							You then have an additional 14 days to return the goods from this
							notification date (goods must be returned within 28 days). We will
							in such circumstances refund you the cost of your order, excluding
							postage or delivery cost.
						</Text>
						<Text>
							However, if goods are not returned "as new" due to excessive
							handling on your part, or with components missing (including
							packing materials and manuals) we may make a reasonable deduction
							for this. Please do not send your product back to the
							manufacturer.
						</Text>
						<Text>
							We kindly ask that to make the refund process easier, that you
							include your receipt or proof of purchase and a cover letter
							detailing briefly why the item is being returned. We cannot refund
							the cost of delivery fees if there was an additional charge, only
							the cost of the goods themselves. We will process the refund when
							the item arrives with us.
						</Text>
					</section>

					<section
						id="sale-items"
						className="space-y-4 pt-4 border-t border-gray-100"
					>
						<Heading variant="h2uppercase">Sale Items</Heading>
						<Text>
							Only regularly priced items may be refunded, unfortunately
							clearance, special order and outlet items cannot be refunded
							unless they are found to be faulty on arrival. For more details
							about returning secondhand or sale items, please contact{" "}
							<a
								href="mailto:sales@hifi-horizon.com"
								className="font-bold hover:underline"
							>
								sales@hifi-horizon.com
							</a>
							.
						</Text>
					</section>

					<section
						id="exchanges"
						className="space-y-4 pt-4 border-t border-gray-100"
					>
						<Heading variant="h2uppercase">Exchanges</Heading>
						<Text>
							We can only replace items if they are defective or damaged. If you
							need to exchange the product for the same item due to a fault,
							please first send us an email at{" "}
							<a
								href="mailto:sales@hifi-horizon.com"
								className="font-bold hover:underline"
							>
								sales@hifi-horizon.com
							</a>{" "}
							and once approved, send your item to:
						</Text>
						<Text className="font-medium">
							HiFi Horizon, 2 Joppa Road, Mackenzie House, Portobello,
							Edinburgh, EH15 2EU.
						</Text>
						<Text>
							Please also include the proof of purchase and a cover letter
							detailing the reason for exchange.
						</Text>
					</section>
				</article>
			</div>
		</main>
	);
}
