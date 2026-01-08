<script lang="ts">
	import { Feather } from '@lucide/svelte';
	import type { Editor } from '$lib/server/data';

	let { editor }: { editor: Editor } = $props();
</script>

<div>
  <a href={editor.url || "/"}>
    <Feather size="64" />
    <h1 class="h5 leading-none mb-1">{editor.name}</h1>
  </a>
	<div class="text-sm leading-[1.2] italic">
		{@html editor.baseline}
	</div>
</div>
