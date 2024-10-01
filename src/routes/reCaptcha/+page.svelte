<script lang="ts">
  import enhance from '$lib';
  import { env } from '$env/dynamic/public';
</script>

<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js?render={env.PUBLIC_RECAPTCHA_SITEKEY}"></script>
</svelte:head>

<center>
  <form
    method="post"
    action="/"
    use:enhance={{
      type: 'recaptcha',
      sitekey: env.PUBLIC_RECAPTCHA_SITEKEY,
      submit:
        () =>
        ({ result }) => {
          alert(result.data.message);
        }
    }}
  >
    <h1>reCaptcha</h1>
    <input type="text" name="name" placeholder="Your name" />
    <button>Submit</button>
  </form>
</center>
