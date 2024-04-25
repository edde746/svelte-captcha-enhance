declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	// from https://github.com/le0developer/turnstile-types
	interface TurnstileRenderParams {
		sitekey: string;
		action?: string;
		cData?: string;
		callback?: (token: string) => void;
		"error-callback"?: () => void;
		"expired-callback"?: (token: string) => void;
		"timeout-callback"?: () => void;
		theme?: "light" | "dark" | "auto"; // defaults to "auto"
		language?: SupportedLanguages | "auto"; // defaults to "auto"
		tabindex?: number; // defaults to 0
		"response-field"?: boolean; // defaults to true
		"response-field-name"?: string; // defaults to cf-"turnstile-response"
		size?: "normal" | "invisible" | "compact"; // defaults to "normal"
		retry?: "auto" | "never"; // defaults to "auto"
		"retry-interval"?: number; // up to 15m (900_000) in ms, defaults to 8s
		"refresh-expired"?: "auto" | "manual" | "never"; // defaults to "auto"
	}

	interface Window {
		grecaptcha: any;
		hcaptcha: {
			execute: (widgetId: any, { async: boolean }) => Promise<{ response: string; key: string }>;
		},
		turnstile: {
			execute: (container: string | HTMLElement, jsParams?: TurnstileRenderParams) => Promise<string>;
			remove: (container: string | HTMLElement) => void;
		}
	}
}

export { };
