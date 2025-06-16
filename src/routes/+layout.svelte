<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
</svelte:head>

{@render children?.()}
