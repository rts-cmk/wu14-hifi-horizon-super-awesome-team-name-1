import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
	component: RouteComponent,
});

interface HistorySectionData {
	title: string;
	description: string;
	paragraphs: string[];
	image: {
		alt: string;
	};
}

const historyData: HistorySectionData[] = [
	{
		title: "History",
		description:
			"Established in the late 1960s, our family owned business is based in Edinburgh and Falkirk, but services customers across the UK.",
		paragraphs: [
			"Our Edinburgh branch has the longest history as an audio retailer in the UK. During recent renovations, receipts were found from Nicolson's Gramophone Saloon dating back to 1926. In the 1950s WG Graham took over the shop and renamed it WG Graham's HiFi Corner. Upon his retirement, Graham Tiso bought the business and modernized the name to HiFi Horizon.",
			"Soon thereafter a young enthusiastic Colin MacKenzie (left), who was recommended by Linn's own Ivor Tiefenbrun, was employed to manage the shop; with a knack for business and years of experience in the hi-fi industry, Colin would later become the owner of HiFi Horizon. Today, Struan MacKenzie carries on the legacy as the company's Managing Director.",
		],
		image: {
			alt: "Historical photo of HiFi Horizon founders",
		},
	},
	{
		title: "Hear The Difference",
		description: "Book a demonstration at our Edinburgh or Falkirk showrooms.",
		paragraphs: [
			"Would you choose a quality car without a test drive? If you are familiar with the brand and have great trust in it, you might. However, our listening preferences are unique to the individual and with many of our customers new to the world of high quality sound and vision, we encourage everyone to come in to demonstrate the products they are interested in. You'll find a relaxing and comfortable environment in both our Edinburgh and Falkirk premises where you can decide for yourself if the kit is right for you. We also offer home demonstrations on selected products.",
			"It's our aim to get the right product for you.",
			"Our experts are on hand to guide you through the differences between speakers, amplifiers and sources and provide simple solutions that suit your needs.",
		],
		image: {
			alt: "Customer listening demonstration",
		},
	},
	{
		title: "Services",
		description:
			"Our passion for the products we sell and, for our customers' satisfaction simply means that we happily offer additional services not found on the high-street.",
		paragraphs: [
			"Home Setup - We want to ensure that the equipment you've purchased from us is installed correctly and sounds perfect; and we happily provide this service throughout the UK.",
			"Part Exchange – To help you upgrade your system, we offer our part-exchange program. We can offer a set price, or sell your old kit on your behalf.",
			"Turntable Doctor – Our turntable experts have been trained by the manufacturers for initial setup, long-term maintenance, and upgrading your high quality turntables.",
			"Record Cleaning Service – Have some old records that need a bit of love? We offer Scotland's very own professional record cleaning service with our bespoke Pro-Ject record cleaner.",
		],
		image: {
			alt: "Technical services and setup",
		},
	},
	{
		title: "Tailored For You",
		description: "We look forward to customising a system to meet your needs.",
		paragraphs: [
			"We don't favour one manufacturer over another – the only thing we do favour is making sure our customers get the right product that suits their needs and listening preferences. We will ask many questions in order to ensure that what you buy from us is tailored to you and you alone.",
			"If you are looking for a product not found in our demonstration showrooms or our online site, don't fret as we have access to hundreds of brands.",
			"One of our biggest pleasures of working in this industry is to see the smile on our customers' faces when they finally hear and see the system of their dreams.",
		],
		image: {
			alt: "Customized audio system",
		},
	},
];

function RouteComponent() {
	return (
		<main className="min-h-screen w-full px-4 md:px-8 pb-32">
			<div className="max-w-7xl mx-auto">
				<PageHeader>OUR HISTORY</PageHeader>

				<article className="space-y-12 bg-white p-8">
					{historyData.map((section, idx) => {
						const imageSrc = `/assets/about/${section.title
							.toLowerCase()
							.replace(/\s+/g, "-")}.png`;

						const imageLeftOnDesktop = idx % 2 === 0;

						return (
							<section key={section.title} className="w-full">
								<div className="flex flex-col md:flex-row items-stretch gap-8">
									<div
										className={cn(
											"w-full md:w-1/2 order-2",
											imageLeftOnDesktop ? "md:order-1" : "md:order-2",
										)}
									>
										<img
											src={imageSrc}
											alt={section.image.alt}
											className="w-full h-full object-cover rounded shadow-sm border border-gray-100"
										/>
									</div>

									<div
										className={cn(
											"w-full md:w-1/2 flex flex-col justify-center order-1",
											imageLeftOnDesktop ? "md:order-2" : "md:order-1",
										)}
									>
										<div className="h-full flex flex-col justify-center">
											<div className="text-center space-y-4">
												<Heading variant="h2" className="text-black font-bold">
													{section.title}
												</Heading>
												<Text
													variant="default"
													className="text-orange-500 font-medium"
												>
													{section.description}
												</Text>
												<div className="space-y-4">
													{section.paragraphs.map((paragraph) => (
														<Text
															key={paragraph.slice(0, 50)}
															className="text-gray-700 leading-relaxed"
														>
															{paragraph}
														</Text>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						);
					})}
				</article>
			</div>
		</main>
	);
}
