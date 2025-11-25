<script lang="ts">
	import { Feather } from '@lucide/svelte';
	import type { Editor } from '$lib/server/data';

	let { editor }: { editor: Editor } = $props();
</script>

<div class="headline">
	<Feather size="64" />
	<h2 class="footer-title">{editor.name}</h2>
	<div class="font-bold">
		{@html editor.baseline}
	</div>
</div>
