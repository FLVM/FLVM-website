<script lang="ts">
	import type { Places } from "$lib/server/data"

  let { place }: { place?: Places } = $props()
</script>

{#if place}
<div>
  Lieux : <strong>{place.name}</strong> ({place.address.city})
</div>
{/if}
