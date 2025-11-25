<script lang="ts">
	import type { Editor, Link } from '$lib/server/data';
	import type { ClassValue } from 'svelte/elements';
	import Headline from '$lib/components/shared/headline.svelte';
	import ButtonSocial from '$lib/components/shared/button/social.svelte';

	let props: { class?: ClassValue; editor: Editor; links: Link[] } = $props();
</script>

<footer
	id="mobile-navigation"
	class="{props.class} footer md:footer-horizontal max-md:footer-vertical bg-primary text-primary-content p-10 pb-0 gap-4"
>
	<aside class="max-md:flex-col flex gap-4">
		<Headline editor={props.editor} />
		<div class="max-w-[24rem]">
			{@html props.editor.description}
		</div>
	</aside>
	<nav class="">
		<h6 class="footer-title">Navigation</h6>
		{#each props.links as link}
			<a class="link link-hover" href={link.url}>{link.text}</a>
		{/each}
		<!-- @todo: ajouter les autres liens  -->
	</nav>
	<nav class="justify-center">
		<h6 class="footer-title">Réseaux sociaux</h6>
		<div class="flex flex-wrap gap-4">
			{#each props.editor.socials as link}
				<ButtonSocial {link} size="lg" />
			{/each}
		</div>
	</nav>
</footer>
<footer class="footer footer-mentions footer-center py-4 pt-2">
	<p>© {new Date().getFullYear()}</p>
	<a href="/styleguide">Guide de style</a>
	<a href="/legals/mentions-legales">Mentions légales</a>
</footer>
