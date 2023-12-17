# svelte-recaptcha-enhance

A lightweight SvelteKit utility to easily add Google reCAPTCHA v3 to your forms with progressive enhancement. This package helps you integrate Google's powerful reCAPTCHA solution into your SvelteKit applications to prevent automated software (bots) from engaging in abusive activities on your site.

## Installation

Use npm to install the `svelte-recaptcha-enhance` package:

```bash
npm install svelte-recaptcha-enhance
```

## Example

Below is an example of how to use `svelte-recaptcha-enhance` in your SvelteKit application:

```svelte
<script>
  import recaptchaEnhance from 'svelte-recaptcha-enhance';
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js?render={import.meta.env.VITE_SITEKEY}">
  </script>
</svelte:head>

<form
  method="post"
  use:recaptchaEnhance={{
    siteKey: import.meta.env.VITE_SITEKEY,
    callback:
      ({ formData }) =>
      ({ result }) => {
        alert(result.data.message);
      }
  }}
>
  <input type="text" name="name" placeholder="Your name" />
  <button>Submit</button>
</form>
```

## Usage

You'll need to get your `siteKey` from Google's reCAPTCHA admin console and include it in your environment variables (`VITE_SITEKEY` in the example).

The `callback` function is the same as what would usually be passed to the `enhance` function ([documentation](https://kit.svelte.dev/docs/form-actions#progressive-enhancement)).
