import { enhance } from '$app/forms';
import type { SubmitFunction } from '@sveltejs/kit';

type RecaptchaOptions = {
  type: 'recaptcha';
  sitekey: string;
  action?: string;
}

type HcaptchaOptions = {
  type: 'hcaptcha';
}

type TurnstileOptions = {
  type: 'turnstile';
  container?: string | HTMLElement;
} & Omit<TurnstileRenderParams, 'callback'>;

type BypassOptions = {
  type: 'bypass';
}

export type CaptchaConfig = (BypassOptions | RecaptchaOptions | HcaptchaOptions | TurnstileOptions) & {
  callback: SubmitFunction;
}

export default (
  form: HTMLFormElement,
  { callback, ...options }: CaptchaConfig
) => {
  enhance(form, async (evt) => {
    if (options.type === 'bypass') return callback(evt);

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
        window.hcaptcha.execute(undefined, { async: true }).then(({ response }) => {
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
    return callback(evt);
  });
};
