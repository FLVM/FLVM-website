<script lang="ts">
	import TwoCols from '$lib/components/layout/two-cols.svelte';
	import CalendarEvent from '$lib/components/calendar/event.svelte';
	import type { Booking } from '$lib/server/data';
	import type { CalendarEventType } from './+page';
	import { XIcon } from '@lucide/svelte';
	import Card from '$lib/components/shared/card.svelte';
	import { browser } from '$app/environment';
	import Cover from '$lib/components/shared/cover.svelte';

	type Props = {
		data: {
			booking: Booking;
			eventsCalendar: Array<CalendarEventType>;
		};
	};

	let { data }: Props = $props();
	let querySearch = $state('');
	let filterTags = $state([
		{ label: 'Pâtisserie', value: 'pâtisserie', checked: false },
		{ label: 'Confiserie', value: 'confiserie', checked: false },
		{ label: 'Cuisine', value: 'cuisine', checked: false },
		{ label: 'Enfants', value: 'enfants', checked: false }
	]);
	let checkedFilterTags = $derived(filterTags.filter((tag) => tag.checked));
	const eventsCalendar = data.eventsCalendar;
	const filteredEvents = $derived(
		eventsCalendar
			// Filter OR
			// .filter(e => {
			//   if (checkedFilterTags.length <= 0) return true
			//   return checkedFilterTags.some(tag => e.tags.includes(tag.value))
			// })
			// Filter AND
			.filter((e) => {
				if (checkedFilterTags.length <= 0) return true;
				return checkedFilterTags.every((tag) => e.tags.includes(tag.value));
			})
			.filter((e) => {
				if (querySearch.length < 3) return true;
				const title = e.title.replace(/[.*+?^${}()|[\]\\]/, '\\$&');
				const regex = new RegExp(querySearch, 'i');
				return regex.test(title);
			})
	);

	function changeFilterValue(target: EventTarget & HTMLInputElement) {
		const filter = filterTags.find((f) => f.value === target.value);
		if (!filter) return;
		filter.checked = target.checked;
	}

	function changeSearchValue(target: EventTarget & HTMLInputElement) {
		const query = target.value;
		querySearch = query;
	}
</script>

<main>
	<TwoCols>
		<Cover cover={data.booking.cover} />
		<div class="pr-8 mb-8">
			<div class="typo">
				<h2 id="planning">Planning</h2>
				{#if browser}
					<form class="card preset-filled-surface-100-900 p-4 font-sans">
						<div class="input-group flex mb-2">
							<input
								class="ig-input bg-white"
								type="search"
								placeholder="Macarons, Cupcake…"
								oninput={(e) => changeSearchValue(e.currentTarget)}
							/>
							<button><XIcon /></button>
						</div>
						<div class="flex gap-2">
							<b>Filtres</b>:
							{#each filterTags as tag}
								<label
									for={`id-${tag.value}`}
									class="flex items-center space-x-2 gap-2 cursor-pointer"
								>
									<input
										type="checkbox"
										class="checkbox"
										id={`id-${tag.value}`}
										checked={tag.checked}
										value={tag.value}
										onchange={(e) => changeFilterValue(e.currentTarget)}
									/>
									{tag.label}
								</label>
							{/each}
						</div>
					</form>
				{/if}
				{#if querySearch.length > 3}
					<b>Vous recherchez</b>&nbsp;: «&nbsp;{querySearch}&nbsp;»
				{/if}
				{#if checkedFilterTags.length > 0}
					<div>
						<b>Vos filtres</b> : {checkedFilterTags.map((tag) => tag.label).join(', ')}
						<button
							class="btn btn-sm preset-filled-surface-100-900"
							onclick={(e) => {
								filterTags.forEach((f) => (f.checked = false));
								checkedFilterTags = [];
								return false;
							}}>Supprimer les filtres</button
						>
					</div>
				{/if}
				{#if querySearch.length > 3 || checkedFilterTags.length > 0}
					<p>
						<i>
							{filteredEvents.length} cours trouvé{filteredEvents.length > 1 ? 's' : ''}
						</i>
					</p>
				{/if}
			</div>
			{#each filteredEvents as event}
				<CalendarEvent {event} class="mt-6 mb-2" />
				<hr class="hr" />
			{/each}
		</div>
		{#if data.booking.cards}
			<aside class="mt-12">
				{#each data.booking.cards as card}
					<Card {card} size="sm" class="my-4 first:mt-0 last:pb-0" />
				{/each}
			</aside>
		{/if}
	</TwoCols>
</main>
