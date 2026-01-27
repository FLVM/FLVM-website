<script lang="ts">
	import { Feather } from '@lucide/svelte';
	import type { Editor } from '$lib/server/data';

	let { editor }: { editor: Editor } = $props();
</script>

<div>
  <a href={editor.url || "/"} class="flex">
    <Feather size="64" class="mr-4"/>
		<span>
			<h1 class="h5 leading-none mb-1">{editor.name}</h1>
			<span class="text-sm leading-[1.2] italic">
				{@html editor.baseline}
			</span>
		</span>
  </a>
</div>
