<script lang="ts">
  import "../app.css"
  import favicon from "$lib/assets/favicon.svg"
  import Footer from "$lib/components/layout/footer.svelte"
	import Header from "$lib/components/layout/header.svelte"

  let { children, data } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header links={data.links} editor={data.editor} class="mb-8"/>
{@render children?.()}
<Footer links={data.navigation} editor={data.editor} class="mt-32"/>