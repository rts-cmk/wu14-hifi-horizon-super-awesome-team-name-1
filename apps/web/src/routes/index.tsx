import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main className="w-full h-[calc(100vh-4.5rem)]">
			<section className="w-full h-full">
				<video
					src="/assets/video.mp4"
					autoPlay
					muted
					loop
					className="w-full h-full object-cover"
				/>
			</section>

			{/* popular products section */}
			<section className="w-full px-12">
				<div className="flex justify-between items-center gap-4">
					<h1 className="text-4xl text-[#495464] uppercase font-semibold py-8">
						Popular Products
					</h1>
					<button
						type="button"
						className="bg-orange-500 text-white py-2 px-4 rounded-xs"
					>
						See all products
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
					{Array.from({ length: 4 }).map((_, index) => (
						<article
							key={index.toString()}
							className="w-full h-full flex flex-col gap-4 bg-white p-4 border border-gray-200"
						>
							<figure className="w-full flex-1 flex items-center justify-center overflow-hidden">
								<img
									src="https://placehold.co/300x300"
									alt="Auralic Aries G2.1 Streamer"
									className="w-full h-full object-cover"
								/>
							</figure>

							<h3 className="text-black text-xl font-bold text-center">
								Auralic Aries G2.1 Streamer (Digital Output)
							</h3>
							<span className="text-black text-xl font-bold text-center">
								£ 4,799.00
							</span>
							<button
								type="button"
								className="bg-orange-500 text-white py-2 px-8 rounded-xs mt-auto w-fit mx-auto"
							>
								Read more
							</button>
						</article>
					))}
				</div>
			</section>

			{/* what we do & opening hours section */}
			<section className="w-full bg-black py-12">
				<div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
					<article className="flex flex-col gap-4 max-w-2xl text-balance">
						<h2 className="text-white text-4xl font-semibold">What we do</h2>
						<p className="text-white text-base">
							We look forward to customising a system to meet your needs.
						</p>
						<p className="text-white text-base">
							We don't favour one manufacturer over another – the only thing we
							do favour is making sure our customers get the right product that
							suits their needs and listening preferences. We will ask many
							questions in order to ensure that what you buy from us is tailored
							to you and you alone.
						</p>
						<p className="text-white text-base">
							If you are looking for a product not found in our demonstration
							showrooms or our online site, don't fret as we have access to
							hundreds of brands.
						</p>
						<p className="text-white text-base">
							One of our biggest pleasures of working in this industry is to see
							the smile on our customers' faces when they finally hear and see
							the system of their dreams.
						</p>
					</article>
					<article className="flex flex-col gap-6 max-w-2xl">
						<h2 className="text-white text-4xl font-semibold">Opening hours</h2>

						{/* Edinburgh Location */}
						<div className="flex flex-col gap-2 mt-2">
							<h3 className="text-white text-base font-bold">Edinburgh</h3>
							<p className="text-white text-base">
								2 Joppa Rd, Edinburgh, EH15 2EU
							</p>
							<div className="flex flex-col gap-1 text-white text-base">
								<p>Monday to Friday: 10:00am - 5:30pm</p>
								<p>Saturday: 10:00am - 5:30pm</p>
								<p>Sunday: Closed</p>
							</div>
						</div>

						{/* Falkirk Location */}
						<div className="flex flex-col gap-2 mt-4">
							<h3 className="text-white text-base font-bold">Falkirk</h3>
							<p className="text-white text-base">
								44 Cow Wynd, Falkirk, Central Region, FK1 1PU
							</p>
							<div className="flex flex-col gap-1 text-white text-base">
								<p>Monday to Friday: 10:00am - 5:30pm</p>
								<p>Saturday - By appointment only</p>
								<p>Sunday: Closed</p>
							</div>
						</div>
					</article>
				</div>
			</section>

			{/* newsletter signup section */}
			<section className="w-full bg-gray-200 py-16">
				<div className="max-w-7xl mx-auto px-8">
					<div className="bg-white p-8 text-center">
						<h2 className="text-2xl font-bold uppercase text-black mb-4">
							sign up for our newsletter
						</h2>
						<p className="text-black text-base mb-6">
							Subscribing to our newsletter secures you up to date information
							about HiFi Horizons latest updates and offers.
						</p>
						<form className="flex gap-2 justify-center">
							<input
								type="email"
								className="bg-[#E8E8E8] rounded-xs px-4 py-3 flex-1 max-w-md border-none outline-none"
							/>
							<button
								type="submit"
								className="bg-orange-500 text-white py-2 px-8 rounded-xs"
							>
								Sign up
							</button>
						</form>
					</div>
				</div>
			</section>
		</main>
	);
}
