<script lang="ts">
  import enhance from '$lib';
  import { env } from '$env/dynamic/public';
</script>

<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"></script>
</svelte:head>

<center>
  <form
    method="post"
    action="/"
    use:enhance={{
      type: 'turnstile',
      container: '.turnstile', // This is not needed, it just makes it look nicer
      sitekey: env.PUBLIC_TURNSTILE_SITEKEY,
      submit:
        () =>
        ({ result }) => {
          alert(result.data.message);
        }
    }}
  >
    <h1>Turnstile</h1>
    <input type="text" name="name" placeholder="Your name" />
    <!-- This is not needed -->
    <div class="turnstile" />
    <button>Submit</button>
  </form>
</center>
