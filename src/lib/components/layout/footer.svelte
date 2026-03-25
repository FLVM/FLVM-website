<script lang="ts">
	import type { Editor, Link } from '$lib/server/data';
	import type { ClassValue } from 'svelte/elements';
	import ButtonSocial from '$lib/components/shared/button/social.svelte';
	import LightSwitch from '$lib/components/shared/light-switch.svelte';
	import LogoFlvmCompact from '$lib/components/shared/logo/logo-flvm-compact.svelte';
	let props: { class?: ClassValue; editor: Editor; links: Link[] } = $props();
</script>

<footer
	id="mobile-navigation"
	class="{props.class} footer bg-primary text-primary-content gap-4 p-10 pb-0 max-md:footer-vertical md:footer-horizontal"
>
	<aside class="flex gap-4 max-md:flex-col">
		<a href="/" class="flex pt-2">
			<LogoFlvmCompact />
		</a>
		<div class="max-w-[24rem]">
			{@html props.editor.description}
		</div>
	</aside>
	<nav class="">
		<h6 class="footer-title">Navigation</h6>
		{#each props.links as link (link.url)}
			<a class="link link-hover" href={link.url}>{link.text}</a>
		{/each}
		<!-- @todo: ajouter les autres liens  -->
	</nav>
	<nav class="justify-center">
		<h6 class="footer-title">Réseaux sociaux</h6>
		<div class="flex flex-wrap gap-4">
			{#each props.editor.socials as link (link.url)}
				<ButtonSocial {link} size="lg" />
			{/each}
		</div>
	</nav>
</footer>
<footer class="footer footer-mentions footer-center py-4 pt-2">
	<p>© {new Date().getFullYear()}</p>
	<a href="/mentions-legales">Mentions légales</a>
	<LightSwitch />
</footer>
