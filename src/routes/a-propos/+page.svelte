<script lang="ts">
	import TwoCols from "$lib/components/layout/two-cols.svelte"
	import Cover from "$lib/components/shared/cover.svelte"
	import type { About, Editor, Places, Team } from "$lib/server/data"
  
  type Props = {
    data: {
      about: About
      editor: Editor
      places: Places[]
      team: Team[]
    }
  }
  let  { data }: Props = $props()
</script>
<main>
<TwoCols>
  <Cover content={data.about.content} />
  <article>
    <div class="pr-8 typo">
      {@html data.about.content}
    </div>
    <section>
      <h2>Les ateliers</h2>
      {#each data.places as place}
      <article>
        <h3>{place.name}</h3>
        {@html place.content }
      </article>  
      {/each}
    </section>
    <section>
      <h2>L'équipe</h2>
      <ul>
        {#each data.team as {name, title, email}}
        <li>
          <a href={`mailto:${email}`} title={`Contacter ${name}`}>{name}</a> - <em>{title}</em>
        </li>
        {/each}
      </ul>
    </section>
  </article>
  <aside class="mt-11">
    <article class="typo typo-sm p-4 bg-yellow-500">
      <h2>{data.editor.name}</h2>
      <address>
        <strong>{data.editor.address.name}</strong><br/>
        {data.editor.address.street}<br/>
        {data.editor.address.zipcode} {data.editor.address.city}<br/>
        {data.editor.address.country}
      </address>
      <p>
        <strong>{data.editor.contact.name}</strong><br/>
        Email : {data.editor.contact.email}<br/>
        Téléphone : {data.editor.contact.phone}
      </p>
      <p>
        <strong>Réseaux sociaux</strong><br/>
        {#each data.editor.socials as social}
        <a href={social.url}>{social.text}</a><br/>
        {/each}
      </p>
      {#if data.editor.vcf_file}
      <a href={data.editor.vcf_file} class="btn btn-primary w-full bnt-soft">Ajouter à mon carnet d'adresse</a>
      {/if}
    </article>
  </aside>
</TwoCols>
</main>