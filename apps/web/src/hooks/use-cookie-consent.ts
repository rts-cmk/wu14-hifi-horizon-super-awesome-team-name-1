import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent";
const COOKIE_EXPIRES_DAYS = 365;

export type CookieConsentStatus = "accepted" | "declined" | "pending";

export function useCookieConsent() {
	const [status, setStatus] = useState<CookieConsentStatus>("pending");

	useEffect(() => {
		const stored = Cookies.get(COOKIE_CONSENT_KEY);
		if (stored === "accepted" || stored === "declined") {
			setStatus(stored);
		}
	}, []);

	const accept = () => {
		Cookies.set(COOKIE_CONSENT_KEY, "accepted", {
			expires: COOKIE_EXPIRES_DAYS,
			sameSite: "Lax",
		});
		setStatus("accepted");
	};

	const decline = () => {
		Cookies.set(COOKIE_CONSENT_KEY, "declined", {
			expires: COOKIE_EXPIRES_DAYS,
			sameSite: "Lax",
		});
		setStatus("declined");
	};

	const reset = () => {
		Cookies.remove(COOKIE_CONSENT_KEY);
		setStatus("pending");
	};

	const hasConsent = status === "accepted";
	const showBanner = status === "pending";

	return {
		status,
		hasConsent,
		showBanner,
		accept,
		decline,
		reset,
	};
}
