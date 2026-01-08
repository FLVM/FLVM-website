<script lang="ts" module>
  const PAGE_SIZE = 25
</script>

<script lang="ts">
	import TwoCols from '$lib/components/layout/two-cols.svelte';
	import CalendarEvent from '$lib/components/calendar/event.svelte';
	import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@lucide/svelte';
	import Card from '$lib/components/shared/card.svelte';
	import { browser } from '$app/environment';
	import Cover from '$lib/components/shared/cover.svelte';
	import { Pagination, Switch } from '@skeletonlabs/skeleton-svelte';
	import { categories } from '$lib/calendar/eventsCalendar.js';

  let { data } = $props()
	// Query
  let querySearch = $state('');
  // Tags
  let filterTags = $state(categories.map(c => ({
    label: c.charAt(0).toUpperCase() + c.slice(1),
    value: c,
    checked: false
  })))
	let checkedFilterTags = $derived(filterTags.filter((tag) => tag.checked));
  // Status masqués
  let showHiddens = $state(false)

	const eventsCalendar = () => data.eventsCalendar;
	const filteredEvents = $derived(
		eventsCalendar()
      .filter((e) => {
        return e.transparency === "opaque" && showHiddens || e.transparency === "transparent" && !showHiddens
      })
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

  // Pagination
  let page = $state(1) // @todo : récupérerdepuis l'URL
  const start = $derived((page -1) * PAGE_SIZE)
  const end = $derived(start + PAGE_SIZE) 
  const paginatedEvents = $derived(filteredEvents.slice(start, end))

  // Actions pour les filtres
	function changeFilterValue(target: EventTarget & HTMLInputElement) {
		const filter = filterTags.find((f) => f.value === target.value);
		if (!filter) return;
		filter.checked = target.checked;
	}

	function changeSearchValue(target: EventTarget & HTMLInputElement) {
		querySearch = target.value;
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
								class="ig-input preset-filled-surface-50-950"
								type="search"
								placeholder="Macarons, Cupcake…"
                value={querySearch}
								oninput={(e) => changeSearchValue(e.currentTarget)}
							/>
              {#if querySearch.length >= 3}
							<button
                class="ig-btn preset-filled-surface-300-700"
                onclick={(e) => {
                  querySearch = ""
                  return false
                }}
              >
                <XIcon size={16}/>
              </button>
              {/if}
						</div>
						<div class="flex gap-2 mb-2">
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
            <div class="flex gap-2 justify-end">
              <Switch checked={showHiddens} onCheckedChange={(details) => showHiddens = details.checked}>
                <Switch.Label>Afficher les cours cloturés</Switch.Label>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.HiddenInput/>
              </Switch>
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
			{#each paginatedEvents as event}
				<CalendarEvent {event} class="mt-6 mb-2" />
				<hr class="hr" />
			{/each}
			{#if filteredEvents.length/PAGE_SIZE > 1}
      <Pagination
        count={filteredEvents.length}
        pageSize={PAGE_SIZE}
        {page}
        onPageChange={(event) => (page = event.page)}
        class="flex justify-center w-auto border-t-0"
      >
        <Pagination.PrevTrigger><ArrowLeftIcon class="size-4"/></Pagination.PrevTrigger>
        <Pagination.Context>
          {#snippet children(pagination)}
            {#each pagination().pages as page, index(page)}
              {#if page.type === 'page'}
              <Pagination.Item {...page}>
                {page.value}
              </Pagination.Item>
              {:else}
              <Pagination.Ellipsis {index}>&#8230</Pagination.Ellipsis>
              {/if}
            {/each}
          {/snippet}
        </Pagination.Context>
        <Pagination.NextTrigger><ArrowRightIcon class="size-4"/></Pagination.NextTrigger>
      </Pagination>
			{/if}
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
