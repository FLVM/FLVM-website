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
	import type { Editor, Link } from '$lib/server/data';
	import type { ClassValue } from 'svelte/elements';
	import { page } from '$app/state';
	import Headline from '../shared/headline.svelte';

	let props: { editor: Editor; links: Link[]; class?: ClassValue } = $props();
</script>

<AppBar class="{props.class} bg-primary-500 py-6">
	<AppBar.Toolbar class="grid-cols-[auto_1fr] content-start">
		<AppBar.Lead>
      <Headline editor={props.editor} />
		</AppBar.Lead>
		<AppBar.Trail class="justify-end self-start">
      <div class="hidden sm:flex flex-wrap justify-end self-center">
        {#each props.links as link}
          <Button
            {link}
            class={[
              "mb-2",
              page.url.pathname === link.url && 'underline'
            ]}
          />
        {/each}
      </div>
			<NavigationMobile class="sm:hidden" links={props.links} editor={props.editor} />
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
