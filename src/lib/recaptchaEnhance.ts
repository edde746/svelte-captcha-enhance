import { enhance } from '$app/forms';
import type { SubmitFunction } from '@sveltejs/kit';

export default (
  form: HTMLFormElement,
  {
    siteKey,
    callback,
    action = 'submit'
  }: {
    siteKey: string;
    action?: string;
    callback: SubmitFunction;
  }
) => {
  enhance(form, async (evt) => {
    if (form.dataset.recaptcha === 'pending') return evt.cancel();
    form.dataset.recaptcha = 'pending';

    const token = await new Promise<string>((resolve) =>
      window.grecaptcha.ready(() =>
        window.grecaptcha.execute(siteKey, { action: 'submit' }).then((token: string) => resolve(token))
      )
    );

    evt.formData.append('g-recaptcha-response', token);
    form.removeAttribute('data-recaptcha');
    return callback(evt);
  });
};
