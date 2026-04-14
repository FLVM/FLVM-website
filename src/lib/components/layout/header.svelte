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
  import LogoFlvm from '$lib/components/shared/logo/logo-flvm.svelte';

  let props: { editor: Editor; links: Link[]; class?: ClassValue } = $props();
</script>

<AppBar class="{props.class} bg-primary-500 py-6">
  <AppBar.Toolbar class="grid-cols-[auto_1fr] justify-center content-center md:h-10">
    <AppBar.Lead>
      <a href="/" class="block flex flex-col text-center">
        <LogoFlvm
          width="120"
          height="120"
          class="mx-auto mb-4 drop-shadow-lg md:absolute md:top-2 md:left-2"
        />
        <div class="leading-none md:pl-32">
          <h1 class="h6 leading-none">{props.editor.name}</h1>
          <span class="text-xs leading-[1] italic">
            {@html props.editor.baseline}
          </span>
        </div>
      </a>
    </AppBar.Lead>
    <AppBar.Trail class="justify-end self-start">
      <div class="hidden flex-wrap justify-end self-center sm:flex">
        {#each props.links as link (link.url)}
          <Button {link} class={[page.url.pathname === link.url && 'underline']} />
        {/each}
      </div>
      <NavigationMobile class="sm:hidden" links={props.links} editor={props.editor} />
    </AppBar.Trail>
  </AppBar.Toolbar>
</AppBar>
