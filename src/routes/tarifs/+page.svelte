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
		<div class="mb-8 typo border-b-1 border-surface-200-800 pr-8 pb-6 md:border-none">
			<h2 id="tarifs">Tarifs</h2>
			<table class="table">
				<tbody class="align-top">
					{#each data.pricelist.prices as price (price.name)}
						<tr class="border-none md:border-1">
							<td class="min-w-72" style="padding-bottom: 0;"><strong>{price.name}</strong></td>
							<td class="pb-0" style="padding-bottom: 0;"
								>{#if price.price}{price.price}€&nbsp;/&nbsppers.{/if}</td
							>
							<td class="hidden text-xs md:table-cell">{@html price.detail}</td>
						</tr>
						<tr>
							<td class="table-cell text-xs md:hidden" style="padding-top: 0" colspan="2"
								>{@html price.detail}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="text-right">
				<Button
					link={{
						url: '/planning#planning',
						text: 'Réserver un cours',
						color: 'secondary',
						icon_before: 'calendar',
						icon_after: 'arrow-right'
					}}
					class="w-full md:w-auto"
				/>
			</div>
		</div>
		<aside class="mt-12">
			{#each data.pricelist.cards as card (card.title)}
				<Card {card} size="sm" class="my-4 first:mt-0 last:pb-0" />
			{/each}
		</aside>
	</TwoCols>
</main>
