# svelte-captcha-enhance

A lightweight SvelteKit utility that adds CAPTCHA protection to your forms with progressive enhancement. Supports reCAPTCHA v3, hCaptcha, and Cloudflare Turnstile.

## Features

- 🔒 **Multiple CAPTCHA providers**: reCAPTCHA v3, hCaptcha, and Cloudflare Turnstile
- 📦 **Easy integration**: Extends SvelteKit's `enhance` function with CAPTCHA support
- 🎯 **TypeScript support**: Fully typed for better developer experience
- 🪶 **Lightweight**: Minimal bundle size impact

## Installation

```bash
npm install svelte-captcha-enhance
```

## Quick Start

### reCAPTCHA v3

```svelte
<script>
  import { env } from '$env/dynamic/public';
  import enhance from 'svelte-captcha-enhance';
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js?render={env.PUBLIC_RECAPTCHA_SITEKEY}"></script>
</svelte:head>

<form
  method="post"
  use:enhance={{
    type: 'recaptcha',
    sitekey: env.PUBLIC_RECAPTCHA_SITEKEY,
    action: 'submit',
    submit: ({ formData }) => ({ result }) => {
      console.log('Form submitted:', result);
    }
  }}
>
  <input type="text" name="name" placeholder="Your name" required />
  <button type="submit">Submit</button>
</form>
```

### hCaptcha

```svelte
<script>
  import { env } from '$env/dynamic/public';
  import enhance from 'svelte-captcha-enhance';
</script>

<svelte:head>
  <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<div class="h-captcha" data-sitekey={env.PUBLIC_HCAPTCHA_SITEKEY}></div>

<form
  method="post"
  use:enhance={{
    type: 'hcaptcha',
    submit: ({ formData }) => ({ result }) => {
      console.log('Form submitted:', result);
    }
  }}
>
  <input type="text" name="name" placeholder="Your name" required />
  <button type="submit">Submit</button>
</form>
```

### Cloudflare Turnstile

```svelte
<script>
  import { env } from '$env/dynamic/public';
  import enhance from 'svelte-captcha-enhance';
</script>

<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<form
  method="post"
  use:enhance={{
    type: 'turnstile',
    sitekey: env.PUBLIC_TURNSTILE_SITEKEY,
    submit: ({ formData }) => ({ result }) => {
      console.log('Form submitted:', result);
    }
  }}
>
  <input type="text" name="name" placeholder="Your name" required />
  <button type="submit">Submit</button>
</form>
```

## API Reference

### Configuration Options

#### Common Options

| Option | Type | Description |
|--------|------|-------------|
| `submit` | `SubmitFunction` | Optional callback function (same as SvelteKit's `enhance`) |

#### reCAPTCHA Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `type` | `'recaptcha'` | ✅ | CAPTCHA provider type |
| `sitekey` | `string` | ✅ | Your reCAPTCHA site key |
| `action` | `string` | ❌ | Action name for reCAPTCHA v3 (default: 'submit') |

#### hCaptcha Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `type` | `'hcaptcha'` | ✅ | CAPTCHA provider type |
| `widget` | `string` | ❌ | Widget ID (uses first widget if unspecified) |

#### Turnstile Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `type` | `'turnstile'` | ✅ | CAPTCHA provider type |
| `sitekey` | `string` | ✅ | Your Turnstile site key |
| `container` | `string \| HTMLElement` | ❌ | Container element (uses form if unspecified) |
| `theme` | `'light' \| 'dark' \| 'auto'` | ❌ | Theme (default: 'auto') |
| `size` | `'normal' \| 'invisible' \| 'compact'` | ❌ | Size (default: 'normal') |
| `language` | `string \| 'auto'` | ❌ | Language (default: 'auto') |

#### Bypass Mode

For development or testing purposes:

```svelte
<form
  method="post"
  use:enhance={{
    type: 'bypass',
    submit: ({ formData }) => ({ result }) => {
      console.log('Form submitted without CAPTCHA');
    }
  }}
>
  <!-- form content -->
</form>
```

## Server-Side Validation

This library handles the client-side CAPTCHA integration only. You'll need to implement server-side validation yourself using your CAPTCHA provider's verification API. The CAPTCHA responses will be available in your form data as:

- `g-recaptcha-response` (reCAPTCHA)
- `h-captcha-response` (hCaptcha) 
- `cf-turnstile-response` (Turnstile)

## Examples

Check out the [examples directory](https://github.com/edde746/svelte-captcha-enhance/tree/master/src/routes) for complete working examples of each CAPTCHA provider.
