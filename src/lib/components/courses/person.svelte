<script lang="ts">
	import type { Team } from "$lib/server/data"
  
  let { person }: { person?: Team } = $props()
</script>

{#if person }
<div>
  Intervenant : <strong>{person.name}</strong> ({person.title})
</div>
{/if}