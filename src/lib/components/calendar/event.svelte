<script lang="ts">
	import { ClockIcon } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';
	import type { CalendarEventType } from '../../../routes/planning-et-reservation/+page';

	type Props = {
		event: CalendarEventType;
		class: ClassValue;
	};
	let props: Props = $props();
</script>

<article class={['md:flex justify-between text-center md:text-left gap-2', props.class]}>
	<div class="mb-2 w-1/3">
		<h2 class="leading-none">Le {props.event.start.prettyDate}</h2>
		<h1 class="h5">{props.event.title}</h1>
		{#each props.event.tags as tag}
			<span class="chip preset-tonal-primary mr-2">{tag}</span>
		{/each}
	</div>
	<div class="mb-2 w-1/3">
		<div class="mb-2 text-xs">
			{@html props.event.description}
		</div>
		<p class="flex justify-center md:justify-start gap-2">
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
		<a class="btn preset-filled-primary-500" href={props.event.htmlLink}>Réserver le cours</a>
		<p class="text-xs italic text-surface-500">à partir de 29€/personne</p>
	</div>
</article>
