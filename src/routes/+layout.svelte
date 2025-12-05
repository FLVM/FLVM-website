<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/layout/footer.svelte';
	import Header from '$lib/components/layout/header.svelte';
	import { error } from '@sveltejs/kit';

	let { children, data } = $props();

	// Contrôle du mode maintenance
  const maintenance = () => data.maintenance
	if (maintenance()) {
		throw error(503, 'Site en maintenance');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header links={data.links} editor={data.editor} class="mb-8" />
{@render children?.()}
<Footer links={data.navigation} editor={data.editor} class="mt-32" />
