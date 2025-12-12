import { useCookieConsent } from "@/hooks/use-cookie-consent";

export function CookieBanner() {
	const { showBanner, accept, decline } = useCookieConsent();

	if (!showBanner) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 p-4">
			<h3 className="text-lg font-semibold text-gray-900 mb-2">
				Cookie Consent
			</h3>
			<p className="text-sm text-gray-600 mb-4">
				We use cookies to enhance your experience. Some features require cookies
				to function properly.
			</p>
			<div className="flex gap-2">
				<button
					type="button"
					onClick={accept}
					className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-xs text-sm font-medium hover:bg-orange-600 transition-colors"
				>
					Accept
				</button>
				<button
					type="button"
					onClick={decline}
					className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-xs text-sm font-medium hover:bg-gray-300 transition-colors"
				>
					Decline
				</button>
			</div>
		</div>
	);
}
