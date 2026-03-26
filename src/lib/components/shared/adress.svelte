<script lang="ts">
  import type { Address } from '$lib/server/data';
  let { address }: { address?: Address } = $props();
</script>

{#if address}
  <address class="typo-insert mb-6 typo">
    <strong>{address.name}</strong><br />
    {address.street}<br />
    {address.zipcode}
    {address.city}<br />
    {address.country}
  </address>
{/if}
