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
  enhance(form, (evt) => {
    if (form.dataset.recaptcha === 'pending') return evt.cancel();

    if (form.dataset.recaptcha) {
      evt.formData.append('g-recaptcha-response', form.dataset.recaptcha);
      form.removeAttribute('data-recaptcha');
      return callback(evt);
    }

    evt.cancel();
    form.dataset.recaptcha = 'pending';
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action: 'submit' }).then((token: string) => {
        form.dataset.recaptcha = token;
        form.dispatchEvent(
          new SubmitEvent('submit', {
            submitter: evt.submitter
          })
        );
      });
    });
  });
};
