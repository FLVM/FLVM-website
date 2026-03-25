<script lang="ts">
	import ButtonSocial from '$lib/components/shared/button/social.svelte';
	import { MenuIcon, XIcon } from '@lucide/svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import Button from '../shared/button.svelte';
	import { onMount } from 'svelte';
	import type { Editor, Link } from '$lib/server/data';
	import type { ClassValue } from 'svelte/elements';
	import LogoFlvm from '$lib/components/shared/logo/logo-flvm.svelte';

	let props: { editor: Editor; links: Link[]; class?: ClassValue } = $props();

	let open = $state(false);
	// Show link to navigation when JS are disabled
	onMount(() => {
		console.log('Js is activate');
		document.getElementById('show-if-js')?.classList.remove('hidden');
		document.getElementById('hide-if-js')?.classList.add('hidden');
	});
</script>

<div class={props.class}>
	<Dialog {open}>
		<Dialog.Trigger
			id="show-if-js"
			class="btn-icon hidden btn-icon-lg preset-tonal"
			onclick={() => (open = true)}><MenuIcon /></Dialog.Trigger
		>
		<a id="hide-if-js" href="#mobile-navigation" class="btn-icon btn-icon-lg preset-tonal"
			><MenuIcon /></a
		>
		<Portal>
			<Dialog.Backdrop
				class="fixed inset-0 z-50 bg-surface-50-950/50 opacity-0 transition transition-discrete data-[state=open]:opacity-100 starting:data-[state=open]:opacity-0"
			/>
			<Dialog.Positioner class="fixed inset-0 z-50 flex justify-start">
				<Dialog.Content
					class="h-screen w-full -translate-x-full space-y-4 card bg-surface-100-900 p-4 opacity-0 shadow-xl transition transition-discrete data-[state=open]:translate-x-0 data-[state=open]:opacity-100 starting:data-[state-open]:opacity-0 starting:data-[state=open]:-translate-x-full"
				>
					<header class="">
						<Dialog.CloseTrigger
							class="absolute right-3 btn-icon preset-tonal"
							onclick={() => (open = false)}
						>
							<XIcon />
						</Dialog.CloseTrigger>

						<Dialog.Title class="text-center">
							<LogoFlvm class="mx-auto mb-4" />
							<h1 class="h6 leading-none">{props.editor.name}</h1>
							<span class="text-xs leading-[1] italic">
								{@html props.editor.baseline}
							</span>
						</Dialog.Title>
					</header>
					<nav class="btn-group flex w-full flex-col">
						{#each props.links as link (link.url)}
							<Button {link} class="w-full" onclick={() => (open = false)} />
						{/each}
					</nav>
					<hr class="hr" />
					{#if props.editor.socials}
						<nav class="flex w-full flex-wrap justify-center gap-4 text-base">
							{#each props.editor.socials as link (link.url)}
								<ButtonSocial {link} size="lg" onclick={() => (open = false)} />
							{/each}
						</nav>
					{/if}
					<hr class="mb-12 hr" />
					<nav class="btn-group flex w-full flex-col">
						<a href="/mentions-legales" onclick={() => (open = false)}>Mentions légales</a>
					</nav>
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog>
</div>
