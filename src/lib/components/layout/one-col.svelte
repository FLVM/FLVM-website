<script lang="ts">
	import type { Snippet } from "svelte"
	import type { ClassValue } from "svelte/elements"
  
  let props: { children: Snippet, class?: ClassValue, style?: string } = $props()
  const style = props.style
</script>
<div class="{props.class} container mx-auto max-w-[56rem] p-4" {style}>
  {@render props.children()}
</div>