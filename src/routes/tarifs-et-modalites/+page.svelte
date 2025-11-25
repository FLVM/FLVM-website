<script lang="ts">
	import TwoCols from '$lib/components/layout/two-cols.svelte';
	import type { Pricelist } from '$lib/server/data';
	import Button from '$lib/components/shared/button.svelte';
	import Card from '$lib/components/shared/card.svelte';
	import Cover from '$lib/components/shared/cover.svelte';

	type Props = {
		data: {
			pricelist: Pricelist;
		};
	};

	let { data }: Props = $props();
</script>

<main>
	<TwoCols>
		<Cover cover={data.pricelist.cover} />
		<div class="typo pr-8 mb-8 border-b-1 md:border-none border-surface-200-800 pb-6">
			<h2 id="tarifs">Tarifs</h2>
			<table class="table">
				<tbody class="align-top">
					{#each data.pricelist.prices as price}
						<tr class="border-none md:border-1">
							<td class="min-w-72" style="padding-bottom: 0;"><strong>{price.name}</strong></td>
							<td class="pb-0" style="padding-bottom: 0;"
								>{#if price.price}{price.price}€&nbsp;/&nbsppers.{/if}</td
							>
							<td class="text-xs hidden md:table-cell">{@html price.detail}</td>
						</tr>
						<tr>
							<td class="text-xs md:hidden table-cell" style="padding-top: 0" colspan="2"
								>{@html price.detail}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="text-right">
				<Button
					link={{
						url: '/planning-et-reservation',
						text: 'Réserver un cours',
						color: 'primary-500',
						icon_before: 'calendar',
						icon_after: 'arrow-right'
					}}
					class="w-full md:w-auto"
				/>
			</div>
		</div>
		<aside class="mt-11">
			{#each data.pricelist.cards as card}
				<Card {card} size="sm" class="my-4 last:pb-0" />
			{/each}
		</aside>
	</TwoCols>
</main>
