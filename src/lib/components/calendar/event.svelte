<script lang="ts">
	import type { CalendarEventType } from '$lib/calendar/eventsCalendar';
	import { BabyIcon, Candy, ClockIcon, CookingPot, DessertIcon } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';
	import Button from '../shared/button.svelte';

	type Props = {
		event: CalendarEventType;
		class?: ClassValue;
	};
	let props: Props = $props();
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/replace#exemples
  const mailtoLink = `mailto:hello@example.com?subject=R%C3%A9servation%20d'un%20cours%20%22${props.event.title}%22&body=(veuillez%20remplir%20les%20champs%20entre%20crochets%20%5B%20%5D)%0ABonjour%2C%0A%0AJe%20souhaite%20r%C3%A9server%20un%20cours%20%22${props.event.title}%22%20pour%20%5Bn%5D%20personnes%20pour%20le%20${props.event.start.prettyDate}.%0A%0AJe%20vous%20doit%20la%20somme%20de%20%5Bn%5D%20%C3%97%20${props.event.tags.includes("enfants") ? "29" : "39"}%E2%82%AC%2C%20soit%20un%20total%20de%20%5Bn%5D%E2%82%AC.%20R%C3%A9gl%C3%A9%20par%20virement%20%7C%20par%20ch%C3%A8que%20sur%20place%20%7C%20en%20liquide%20sur%20place%20(supprimez%20les%20mentions%20inutiles)%5D.%20%0A%0A%5BVotre%20nom%5D%0ABien%20cordialement.`

</script>

<article class={['@container', props.class]}>
  <div class="@xl:flex justify-between text-center @xl:text-left gap-2">
    <div class="mb-2 @xl:w-1/3 mb-2 flex-grow">
      <h2 class="leading-none mb-2">Le {props.event.start.prettyDate}</h2>
      <h1 class="h6 leading-none mb-2">{props.event.title}</h1>
      <div class="flex justify-center @xl:justify-start gap-1">
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
      <p class="flex justify-center @xl:justify-start gap-2 mb-2">
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
      <div class="mb-2 text-xs">
        {@html props.event.description}
      </div>
      <!-- <div class="text-sm">
        Organisé par <a href={`mailto:${event.organizer.email}`}>{event.organizer.displayName || event.organizer.email}</a>
      </div> -->
    </div>
    <div>
      <Button link={{
        text: "Réserver ce cours",
        url: mailtoLink,
        color: "secondary-500"
      }}
        class="btn-sm"
      />
      <p class="text-xs italic text-surface-500 mb-2">
        {#if props.event.tags.includes("enfants")}29€ / enfant{:else}à partir de 39€ / pers.{/if}
      </p>
    </div>
  </div>
</article>
