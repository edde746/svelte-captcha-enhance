import { enhance as enhanceForm } from '$app/forms';
import type { SubmitFunction } from '@sveltejs/kit';

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
  language?: string | "auto"; // defaults to "auto"
  tabindex?: number; // defaults to 0
  "response-field"?: boolean; // defaults to true
  "response-field-name"?: string; // defaults to cf-"turnstile-response"
  size?: "normal" | "invisible" | "compact"; // defaults to "normal"
  retry?: "auto" | "never"; // defaults to "auto"
  "retry-interval"?: number; // up to 15m (900_000) in ms, defaults to 8s
  "refresh-expired"?: "auto" | "manual" | "never"; // defaults to "auto"
}

declare global {
  interface Window {
    grecaptcha: any;
    hcaptcha: {
      execute: (widgetId: any, options: { async: boolean }) => Promise<{ response: string; key: string }>;
    },
    turnstile: {
      execute: (container: string | HTMLElement, jsParams?: TurnstileRenderParams) => Promise<string>;
      remove: (container: string | HTMLElement) => void;
    }
  }
};

type RecaptchaOptions = {
  type: 'recaptcha';
  sitekey: string;
  action?: string;
}

type HcaptchaOptions = {
  type: 'hcaptcha';
  /**
   * If unspecified, the first widget on the page will be used.
   */
  widget?: string;
}

type TurnstileOptions = {
  type: 'turnstile';
  container?: string | HTMLElement;
} & Omit<TurnstileRenderParams, 'callback'>;

type BypassOptions = {
  type: 'bypass';
}

type CaptchaConfig = (BypassOptions | RecaptchaOptions | HcaptchaOptions | TurnstileOptions) & {
  submit?: SubmitFunction;
}

const enhance = (
  form: HTMLFormElement,
  { submit = () => ({ update }) => update(), ...options }: CaptchaConfig
) => {
  enhanceForm(form, async (evt) => {
    if (options.type === 'bypass') return submit(evt);

    if (form.dataset.captcha === 'pending') return evt.cancel();
    form.dataset.captcha = 'pending';

    await new Promise<void>((resolve) => {
      if (options.type === 'recaptcha') {
        window.grecaptcha.ready(() =>
          window.grecaptcha.execute(options.sitekey, { action: options.action }).then((token: string) => {
            evt.formData.append('g-recaptcha-response', token);
            resolve();
          })
        );
      } else if (options.type === 'hcaptcha') {
        window.hcaptcha.execute(options.widget, { async: true }).then(({ response }) => {
          evt.formData.append('h-captcha-response', response);
          resolve();
        });
      } else if (options.type === 'turnstile') {
        const container = options.container || form;
        window.turnstile.execute(container, {
          ...options,
          callback: (token) => {
            evt.formData.append('cf-turnstile-response', token);
            window.turnstile.remove(container);
            resolve();
          }
        });
      }
    });

    form.removeAttribute('data-captcha')
    return submit(evt);
  });
};

export default enhance;
