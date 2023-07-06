<script lang="ts">
	import recaptchaEnhance from '$lib/recaptchaEnhance';
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={import.meta.env.VITE_SITEKEY}">
	</script>
</svelte:head>

<form
	method="post"
	use:recaptchaEnhance={{
		siteKey: import.meta.env.VITE_SITEKEY,
		func:
			({ formData }) =>
			({ result }) => {
				alert(result.data.message);
			}
	}}
>
	<h1>svelte-recaptcha-enhance</h1>
	<input type="text" name="name" placeholder="Your name" />
	<button>Submit</button>
</form>

<style>
	* {
		all: unset;
		font-family: sans-serif;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 24rem;
		margin: 0 auto;
	}
	form > * {
		width: 100%;
		display: block;
		margin-bottom: 0.25rem;
		text-align: center;
	}

	input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
	}

	button {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		background: #eee;
		cursor: pointer;
	}

	h1 {
		text-align: center;
		font-size: 1.5rem;
		font-weight: 700;
		margin: 2rem 0;
	}
</style>
