<script lang="ts">
  import type { CalendarEventType } from '$lib/calendar/eventsCalendar';
  import { BabyIcon, Candy, ClockIcon, CookingPot, DessertIcon } from '@lucide/svelte';
  import type { ClassValue } from 'svelte/elements';
  import Button from '../shared/button.svelte';
  import type { Editor } from '$lib/server/data';

  type Props = {
    event: CalendarEventType;
    contact: Editor['contact']['email'];
    class?: ClassValue;
  };
  let props: Props = $props();
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/replace#exemples
  const mailtoLink = () =>
    `mailto:${props.contact}?subject=R%C3%A9servation%20d'un%20cours%20%22${props.event.title}%22&body=(veuillez%20remplir%20les%20champs%20entre%20crochets%20%5B%20%5D)%0ABonjour%2C%0A%0AJe%20souhaite%20r%C3%A9server%20un%20cours%20%22${props.event.title}%22%20pour%20%5Bn%5D%20personnes%20pour%20le%20${props.event.start.prettyDate}.%20%0A%0A%5BVotre%20nom%5D%0ABien%20cordialement.`;
  const active = () => props.event.transparency === 'transparent';
  const tags = () => props.event.tags.map((t, k) => ({ id: k, name: t }));
</script>

<article class={['@container', props.class]}>
  <div class="justify-between gap-2 @xl:flex">
    <div class="mb-2 flex-grow @xl:w-1/3">
      <h2 class="mb-2 leading-none">Le {props.event.start.prettyDate}</h2>
      <h1 class="mb-2 h6 leading-none">{props.event.title}</h1>
      <div class="flex justify-center justify-start gap-1">
        {#each tags() as tag (tag.id)}
          <span title={tag.name} class="text-surface-600">
            {#if tag.name === 'pâtisserie'}<DessertIcon />{/if}
            {#if tag.name === 'enfants'}<BabyIcon />{/if}
            {#if tag.name === 'cuisine'}<CookingPot />{/if}
            {#if tag.name === 'confiserie'}<Candy />{/if}
          </span>
        {/each}
      </div>
    </div>
    <div class="mb-2 @xl:w-1/3">
      <p class="mb-2 flex justify-center justify-start gap-2 sm:max-md:flex-col">
        <span class="badge preset-filled">
          <ClockIcon size={16} />
          {props.event.start.prettyHour} - {props.event.end.prettyHour}
        </span>
        <span class={['badge', active() ? 'preset-filled-success-500' : 'preset-filled-error-500']}>
          {active() ? 'disponible' : 'complet'}
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
      <Button
        link={{
          text: 'Réserver ce cours',
          url: mailtoLink(),
          color: 'secondary'
        }}
        disabled={!active}
        class="btn-md"
      />
      <p class="mb-2 text-xs text-surface-500 italic">
        {#if props.event.tags.includes('enfants')}29€ / enfant{:else}à partir de 39€ / pers.{/if}
      </p>
    </div>
  </div>
</article>
