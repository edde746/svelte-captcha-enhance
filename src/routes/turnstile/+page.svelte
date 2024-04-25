<script lang="ts">
  import enhance from '$lib';
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
      sitekey: import.meta.env.VITE_TURNSTILE_SITEKEY,
      callback:
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
