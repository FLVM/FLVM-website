<script lang="ts">
	import { dev } from '$app/environment';

	let { summary = 'Debug', data, open = false } = $props();
</script>

{#if dev}
	<details {open} class="typo">
		<summary class="cursor-pointer">{summary}</summary>
		<pre lang="json">{JSON.stringify(data, null, 2)}</pre>
	</details>
{/if}
