# svelte-captcha-enhance

A lightweight SvelteKit utility to easily add a captcha to your forms with progressive enhancement. Currently reCaptcha, hCaptcha and turnstile are supported.

## Installation

Use npm to install the `svelte-captcha-enhance` package:

```bash
npm install svelte-captcha-enhance
```

## Example

Below is an example of how to use `svelte-captcha-enhance` in your SvelteKit application:

```svelte
<script>
  import enhance from 'svelte-captcha-enhance';
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js?render={import.meta.env.VITE_SITEKEY}"></script>
</svelte:head>

<form
  method="post"
  use:enhance={{
    type: 'recaptcha',
    sitekey: import.meta.env.VITE_SITEKEY,
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

Check [src/routes](https://github.com/edde746/svelte-captcha-enhance/tree/master/src/routes) for full examples of hCaptcha & Turnstile.

## Usage

You'll need to get your `sitekey` from the desired captcha provider and include it in your environment variables (`VITE_SITEKEY` in the example).

The `callback` function is the same as what would usually be passed to the `enhance` function ([documentation](https://kit.svelte.dev/docs/form-actions#progressive-enhancement)).
