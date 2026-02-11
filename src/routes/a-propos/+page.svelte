<script lang="ts">
	import TwoCols from '$lib/components/layout/two-cols.svelte';
	import Cover from '$lib/components/shared/cover.svelte';
	import Address from '$lib/components/shared/adress.svelte';
	import type { About, Editor, Places, Team } from '$lib/server/data';

	type Props = {
		data: {
			about: About;
			editor: Editor;
			places: Places[];
			team: Team[];
		};
	};
	let { data }: Props = $props();
</script>

<main>
	<TwoCols>
		<Cover cover={data.about.cover} />
		<article>
			<div class="pr-8 typo">
				{@html data.about.content}
			</div>
			<section>
				<h2 class="h2">Les ateliers</h2>
				{#each data.places as place}
					<article class="typo">
						{#if place.image }
						<figure>
							<img src={place.image.src} alt={place.image.alt}/>
							{#if place.image.legend}
							<figcaption>{@html place.image.legend}</figcaption>
							{/if}
						</figure>
						{/if}
						<h3>{place.name}</h3>
						{@html place.content}
						{#if place.hours}
						<div class="typo typo-insert mb-6">
							{@html place.hours}
						</div>
						{/if}
						<Address address={place.address} />
					</article>
				{/each}
			</section>
			<section class="typo">
				<h2>L'équipe</h2>
				{#each data.team as { name, title, email, phone, description}}
					<article>
						<h3>{name}</h3>
						<em>{title}</em>
						<p>{@html description}</p>
						{#if phone || email}
						<p class="typo typo-insert my-6">
							Contacter {name}
							{#if email}
							<a href={`mailto:${email}`} title={`Contacter ${name} par courriel`}>par email</a>
							{/if}
							{(phone && email) && 'ou'}
							{#if phone}
							<a href={`phone:${phone}`} title={`Contacter ${name} par téléphone`}>par téléphone</a>
							{/if}
						</p>
						{/if}
					</article>
				{/each}
			</section>
		</article>
		<aside class="mt-11" id="contact">
			<article class="typo typo-sm p-4 bg-yellow-500">
				<h2>{data.editor.name}</h2>
				<address>
					<strong>{data.editor.address.name}</strong><br />
					{data.editor.address.street}<br />
					{data.editor.address.zipcode}
					{data.editor.address.city}<br />
					{data.editor.address.country}
				</address>
				<p>
					<strong>{data.editor.contact.name}</strong><br />
					Email : {data.editor.contact.email}<br />
					Téléphone : {data.editor.contact.phone}
				</p>
				<p>
					<strong>Réseaux sociaux</strong><br />
					{#each data.editor.socials as social}
						<a href={social.url}>{social.text}</a><br />
					{/each}
				</p>
				{#if data.editor.vcf_file}
					<a href={data.editor.vcf_file} class="btn btn-primary w-full bnt-soft"
						>Ajouter à mon carnet d'adresse</a
					>
				{/if}
			</article>
		</aside>
	</TwoCols>
</main>
