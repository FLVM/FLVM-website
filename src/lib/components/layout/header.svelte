<script lang="ts">
	/**
	 * Stratégie de l'affichage de la barre d'application, implique les portions
	 * d'affichage suivantes :
	 * 1. Titre, peut passer à la ligne sous mobile si besoin de place
	 * 2. Trois liens principaux, affiché (dans l'ordre de largeur d'affichage) :
	 *    icône, texte, texte et icône
	 * 3. menu mobile : liste de liens exhaustifs + moteur de recherche
	 */
	import { AppBar, Switch } from '@skeletonlabs/skeleton-svelte';
	import NavigationMobile from '$lib/components/navigation/mobile.svelte';
	import Button from '$lib/components/shared/button.svelte';
	import LightSwitch from '$lib/components/shared/light-switch.svelte';
	import type { Editor, Link } from '$lib/server/data';
	import type { ClassValue } from 'svelte/elements';
	import { page } from '$app/state';

	let props: { editor: Editor; links: Link[]; class?: ClassValue } = $props();
</script>

<AppBar class="{props.class} bg-primary-500 py-6">
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
			<a href="/" class="text-xl">{props.editor.name}</a>
		</AppBar.Lead>
		<AppBar.Headline class="italic text-base leading-[1.2]">
			<div class="flex text-center">
				{@html props.editor.baseline}
			</div>
		</AppBar.Headline>
		<AppBar.Trail>
			<!--
      @todo: ajouter une stratégie d'icone requis :
      - mobile: caché
      - petit: icone
      - moyen: texte
      - large: icon + texte 
      -->
			{#each props.links as link}
				<Button
					{link}
					class={[
						'hidden sm:flex',
						page.url.pathname === link.url && 'underline'
					]}
				/>
			{/each}
			<NavigationMobile class="sm:hidden" links={props.links} editor={props.editor} />
			<LightSwitch />
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
