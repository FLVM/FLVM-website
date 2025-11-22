<script lang="ts">
  import ButtonSocial from "$lib/components/shared/button/social.svelte"
	import { MenuIcon, XIcon } from "@lucide/svelte"
	import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte"
	import Button from "../shared/button.svelte"
	import { onMount } from "svelte"
	import Headline from "../shared/headline.svelte"
	import type { Editor, Link } from "$lib/server/data"
	import type { ClassValue } from "svelte/elements"

  let props: { editor: Editor, links: Link[], class?: ClassValue } = $props()

  let open = $state(false)
  // Show link to navigation when JS are disabled
  onMount(() => {
    console.log("Js is activate")
    document.getElementById("show-if-js")?.classList.remove("hidden")
    document.getElementById("hide-if-js")?.classList.add("hidden")
  })
</script>
<div class={props.class}>
  <Dialog open={open}>
    <Dialog.Trigger id="show-if-js" class="hidden btn-icon btn-icon-lg preset-tonal" onclick={() => open = true }><MenuIcon/></Dialog.Trigger>
    <a id="hide-if-js" href="#mobile-navigation" class="btn-icon btn-icon-lg preset-tonal"><MenuIcon/></a>
    <Portal>
      <Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50 transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100"/>
      <Dialog.Positioner class="fixed inset-0 z-50 flex justify-start">
        <Dialog.Content class="h-screen w-full card bg-surface-100-900 p-4 space-y-4 shadow-xl transition transition-discrete opacity-0 -translate-x-full starting:data-[state-open]:opacity-0 starting:data-[state=open]:-translate-x-full data-[state=open]:opacity-100 data-[state=open]:translate-x-0">
          <header class="flex justify-between items-start">
            <Dialog.Title>
              <Headline editor={props.editor} />
            </Dialog.Title>
            <Dialog.CloseTrigger class="btn-icon preset-tonal" onclick={() => open = false }>
              <XIcon />
            </Dialog.CloseTrigger>
          </header>
          <nav class="btn-group flex flex-col w-full">
            {#each props.links as link}
            <Button {link} class="w-full" onclick={() => open = false} />
            {/each}
          </nav>
          <hr class="hr"/>
          {#if props.editor.socials}
          <nav class="flex flex-wrap w-full gap-4 justify-center text-base">
            {#each props.editor.socials as link}
            <ButtonSocial link={link} size="lg" onclick={() => open = false}/>
            {/each}
          </nav>  
          {/if}
          <hr class="hr mb-12" />
          <nav class="btn-group flex flex-col w-full">
            <a href="/legals" onclick={() => open =false }>Mentions légales</a>
            <a href="styleguide" onclick={() => open = false}>Guide de style</a>
          </nav>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog>
</div>
