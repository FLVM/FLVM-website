<script lang="ts">
	/**
	 * Stratégie de l'affichage de la barre d'application, implique les portions
	 * d'affichage suivantes :
	 * 1. Titre, peut passer à la ligne sous mobile si besoin de place
	 * 2. Trois liens principaux, affiché (dans l'ordre de largeur d'affichage) :
	 *    icône, texte, texte et icône
	 * 3. menu mobile : liste de liens exhaustifs + moteur de recherche
	 */
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import NavigationMobile from '$lib/components/navigation/mobile.svelte';
	import Button from '$lib/components/shared/button.svelte';
	import type { Editor, Link } from '$lib/server/data';
	import type { ClassValue } from 'svelte/elements';
	import { page } from '$app/state';
	import LogoFlvm from '$lib/assets/logo-flvm.svelte';

	let props: { editor: Editor; links: Link[]; class?: ClassValue } = $props();
</script>

<AppBar class="{props.class} bg-primary-500 py-6">
	<AppBar.Toolbar class="md:h-10 grid-cols-[auto_1fr] content-center">
		<AppBar.Lead>
  	<a href={props.editor.url || "/"} class="block flex flex-col text-center">
			<LogoFlvm width="180" height="180" class="mb-4 mx-auto md:absolute md:top-2 md:left-2 drop-shadow-lg" />
			<div class="md:pl-48 leading-none">
				<h1 class="h6 leading-none">{props.editor.name}</h1>
				<span class="text-xs leading-[1] italic">
					{@html props.editor.baseline}
				</span>
			</div>
		</a>
		</AppBar.Lead>
		<AppBar.Trail class="justify-end self-start">
      <div class="hidden sm:flex flex-wrap justify-end self-center">
        {#each props.links as link}
          <Button
            {link}
            class={[
              page.url.pathname === link.url && 'underline'
            ]}
          />
        {/each}
      </div>
			<NavigationMobile class="sm:hidden" links={props.links} editor={props.editor} />
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
