<script lang="ts">
	import type { Snippet } from "svelte"
	import type { ClassValue } from "svelte/elements"
  
  let props: { children: Snippet, class?: ClassValue, style?: string} = $props()
  const style = props.style
</script>
<div class="{props.class} container mx-auto max-w-[76rem] p-4 md:grid md:grid-cols-[48rem_1fr]" {style}>
  {@render props.children()}
</div>