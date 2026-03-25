<script lang="ts">
	import OneCol from '$lib/components/layout/one-col.svelte';
	import type { Legals } from '$lib/server/data';
	// import type { Legals } from '$lib/server/data';
	// import { legals } from '$lib/server/data';

	type Props = {
		data: {
			legals: Legals;
		};
	};

	let { data }: Props = $props();
</script>

<OneCol>
	<main>
		<div class="typo">
			{@html data.legals.content}
		</div>
	</main>
</OneCol>
