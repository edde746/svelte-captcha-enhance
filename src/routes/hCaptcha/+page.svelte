<script lang="ts">
  import enhance from '$lib';
  import { env } from '$env/dynamic/public';
</script>

<svelte:head>
  <script src="https://js.hcaptcha.com/1/api.js" async defer>
  </script>
</svelte:head>

<center>
  <form
    method="post"
    action="/"
    use:enhance={{
      type: 'hcaptcha',
      submit:
        () =>
        ({ result }) => {
          alert(result.data.message);
        }
    }}
  >
    <h1>hCaptcha</h1>
    <input type="text" name="name" placeholder="Your name" />
    <div id="hcaptcha" class="h-captcha" data-sitekey={env.PUBLIC_HCAPTCHA_SITEKEY} data-size="invisible" />
    <button>Submit</button>
  </form>
</center>
