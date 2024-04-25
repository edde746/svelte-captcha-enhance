<script lang="ts">
  import enhance from '$lib';
</script>

<svelte:head>
  <script
    src="https://www.google.com/recaptcha/api.js?render={import.meta.env.VITE_RECAPTCHA_SITEKEY}"
  ></script>
</svelte:head>

<center>
  <form
    method="post"
    action="/"
    use:enhance={{
      type: 'recaptcha',
      sitekey: import.meta.env.VITE_RECAPTCHA_SITEKEY,
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
