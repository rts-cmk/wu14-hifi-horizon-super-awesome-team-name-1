import { Link } from "@tanstack/react-router";
import {
	FaCcMastercard,
	FaCcStripe,
	FaCcVisa,
	FaFacebookSquare,
	FaInstagramSquare,
	FaTwitterSquare,
	FaYoutubeSquare,
} from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="bg-black w-full text-white">
			<div className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto,auto] gap-8">
				<div className="flex flex-col gap-4">
					<nav aria-label="footer links" className="flex flex-col gap-3">
						<ul className="list-none p-0 m-0 space-y-3">
							<li>
								<Link
									to="/"
									className="text-white hover:text-gray-300 text-base md:text-lg"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/shop"
									search={{
										search: undefined,
										brand: undefined,
										color: undefined,
										price: undefined,
										category: undefined,
									}}
									className="text-white hover:text-gray-300 text-base md:text-lg"
								>
									Shop
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="text-white hover:text-gray-300 text-base md:text-lg"
								>
									About Us
								</Link>
							</li>
						</ul>
					</nav>
				</div>

				<div className="flex flex-col gap-4">
					<ul className="list-none p-0 m-0 space-y-3">
						<li>
							<Link
								to="/faq"
								hash="refunds"
								className="text-white hover:text-gray-300 text-base md:text-lg"
							>
								Return & Refunds
							</Link>
						</li>
						<li>
							<Link
								to="/faq"
								hash="delivery"
								className="text-white hover:text-gray-300 text-base md:text-lg"
							>
								Delivery
							</Link>
						</li>
						<li>
							<Link
								to="/privacy-policy"
								className="text-white hover:text-gray-300 text-base md:text-lg"
							>
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link
								to="/terms-and-conditions"
								className="text-white hover:text-gray-300 text-base md:text-lg"
							>
								Terms & Conditions
							</Link>
						</li>
					</ul>
				</div>

				<div className="flex flex-col gap-4">
					<div>
						<Link
							to="/contact"
							className="text-white hover:text-gray-300 text-base md:text-lg"
						>
							Contact
						</Link>
					</div>

					<div className="flex flex-col gap-3 text-sm md:text-base font-semibold">
						<address className="not-italic whitespace-normal">
							2 Joppa Rd, Edinburgh, EH15 2EU
							<span className="flex items-center gap-2 mt-1">
								<svg
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="currentColor"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="inline-block"
								>
									<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
								</svg>
								<span className="ml-1">031 556 7091</span>
							</span>
						</address>

						<address className="not-italic whitespace-normal">
							44 Cow Wynd, Falkirk, Central Region, FK1 1PU
							<span className="flex items-center gap-2 mt-1">
								<svg
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="currentColor"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="inline-block"
								>
									<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
								</svg>
								<span className="ml-1">01324 629 011</span>
							</span>
						</address>
					</div>

					<div className="flex items-center gap-4 mt-2">
						<a
							href="https://www.facebook.com/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook"
							className="text-white hover:text-gray-300"
						>
							<FaFacebookSquare className="inline-block text-2xl md:text-3xl" />
						</a>
						<a
							href="https://www.twitter.com/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Twitter"
							className="text-white hover:text-gray-300"
						>
							<FaTwitterSquare className="inline-block text-2xl md:text-3xl" />
						</a>
						<a
							href="https://www.instagram.com/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
							className="text-white hover:text-gray-300"
						>
							<FaInstagramSquare className="inline-block text-2xl md:text-3xl" />
						</a>
						<a
							href="https://www.youtube.com/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Youtube"
							className="text-white hover:text-gray-300"
						>
							<FaYoutubeSquare className="inline-block text-2xl md:text-3xl" />
						</a>
					</div>
				</div>

				<div className="md:col-span-3 col-span-1 border-t border-white pt-6 mt-4">
					<div className="max-w-7xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
							<div className="flex flex-col items-start gap-3">
								<ul className="flex gap-3 p-0 m-0 list-none">
									<li>
										<a
											href="#stripe"
											aria-label="Stripe"
											className="text-white hover:text-gray-300"
										>
											<FaCcStripe className="text-2xl md:text-3xl" />
										</a>
									</li>
									<li>
										<a
											href="#visa"
											aria-label="Visa"
											className="text-white hover:text-gray-300"
										>
											<FaCcVisa className="text-2xl md:text-3xl" />
										</a>
									</li>
									<li>
										<a
											href="#mastercard"
											aria-label="Mastercard"
											className="text-white hover:text-gray-300"
										>
											<FaCcMastercard className="text-2xl md:text-3xl" />
										</a>
									</li>
								</ul>

								<p className="text-xs md:text-sm text-left font-semibold leading-tight max-w-prose">
									HiFi Horizon (Edinburgh) Ltd is registered in Scotland. No:
									SC049298. Registered office: 2 Joppa Rd, Edinburgh EH15 2EU
								</p>
							</div>

							<div className="hidden md:block" />
							<div className="hidden md:block" />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
