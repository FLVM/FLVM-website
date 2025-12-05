<script lang="ts">
	import type { CalendarEventType } from '$lib/calendar/eventsCalendar';
	import { BabyIcon, Candy, ClockIcon, CookingPot, DessertIcon } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		event: CalendarEventType;
		class?: ClassValue;
	};
	let props: Props = $props();
</script>

<article class={['@container', props.class]}>
  <div class="@xl:flex justify-between text-center @xl:text-left gap-2">
    <div class="mb-2 @xl:w-1/3">
      <h2 class="leading-none mb-2">Le {props.event.start.prettyDate}</h2>
      <h1 class="h6 leading-none mb-2">{props.event.title}</h1>
      <div class="flex justify-center gap-1">
        {#each props.event.tags as tag}
          <span title={tag} class="text-surface-600">
            {#if tag === "pâtisserie"}<DessertIcon />{/if}
            {#if tag === "enfants"}<BabyIcon />{/if}
            {#if tag === "cuisine"}<CookingPot />{/if}
            {#if tag === "confiserie"}<Candy />{/if}
          </span>
        {/each}
      </div>
    </div>
    <div class="mb-2 @xl:w-1/3">
      <div class="mb-2 text-xs">
        {@html props.event.description}
      </div>
      <p class="flex justify-center @xl:justify-start gap-2">
        <span class="badge preset-filled">
          <ClockIcon size={16} />
          {props.event.start.prettyHour} - {props.event.end.prettyHour}
        </span>
        <span
          class={[
            'badge',
            props.event.transparency === 'transparent'
              ? 'preset-filled-success-500'
              : 'preset-filled-error-500'
          ]}
        >
          {props.event.transparency === 'transparent' ? 'disponible' : 'complet'}
        </span>
      </p>
      <!-- <div class="text-sm">
        Organisé par <a href={`mailto:${event.organizer.email}`}>{event.organizer.displayName || event.organizer.email}</a>
      </div> -->
    </div>
    <div>
      <a class="btn btn-sm preset-filled-primary-500" href={props.event.htmlLink}>Réserver le cours</a>
      <p class="text-xs italic text-surface-500">
        {#if props.event.tags.includes("enfants")}29€ / enfant{:else}à partir de 39€ / pers.{/if}
      </p>
    </div>
  </div>
</article>
