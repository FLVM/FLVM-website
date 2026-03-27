<script lang="ts">
  import TwoCols from '$lib/components/layout/two-cols.svelte';
  import Cover from '$lib/components/shared/cover.svelte';
  import Address from '$lib/components/shared/adress.svelte';
  import { type About, type Editor, type Places, type Team } from '$lib/server/data';
  import Button from '$lib/components/shared/button.svelte';
  
  type Props = {
    data: {
      about: About;
      editor: Editor;
      places: Places[];
      team: Team[];
    };
  };
  let { data }: Props = $props();
  // @todo: add closure ?
  function mailtoContact(name?: string, to?: string) {
    name = name || '';
    to = to || data.editor.contact.email;
    const subject = "Demande d'information";
    const body = `Bonjour ${name},\n\nJe vous contact au sujet de ...\n\nBien cordialement.`;
    return encodeURI(`mailto:${to}` + `?subject=${subject}` + `&body=${body}`);
  }
</script>

<main>
  <TwoCols>
    <Cover cover={data.about.cover} />
    <article>
      <div class="typo pr-8">
        {@html data.about.content}
      </div>
      <section>
        <h2 class="h2">Les ateliers</h2>
        {#each data.places as place (place.slug)}
          <article class="typo">
            <h3>{place.name}</h3>
            {#if place.image}
              <figure>
                <img src={place.image.src} alt={place.image.alt} />
                {#if place.image.legend}
                  <figcaption>{@html place.image.legend}</figcaption>
                {/if}
              </figure>
            {/if}
            {@html place.content}
            {#if place.hours}
              <div class="typo-insert mb-6 typo">
                {@html place.hours}
              </div>
            {/if}
            <Address address={place.address} />
          </article>
        {/each}
      </section>
      <section class="typo">
        <h2>L'équipe</h2>
        {#each data.team as { name, title, email, phone, description } (name)}
          <article>
            <h3>{name}</h3>
            <em>{title}</em>
            <p>{@html description}</p>
            {#if phone || email}
              <p class="typo-insert my-6 typo">
                Contacter {name}
                {#if email}
                  <a href={mailtoContact(name, email)} title={`Contacter ${name} par courriel`}
                    >par email</a
                  >
                {/if}
                {phone && email && 'ou'}
                {#if phone}
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    title={`Contacter ${name} par téléphone`}>par téléphone</a
                  >
                {/if}
              </p>
            {/if}
          </article>
        {/each}
      </section>
    </article>
    <aside class="mt-11" id="contact">
      <article class="typo bg-yellow-500 p-4 typo-sm">
        <h2>{data.editor.name}</h2>
        <address>
          <strong>{data.editor.address.name}</strong><br />
          {data.editor.address.street}<br />
          {data.editor.address.zipcode}
          {data.editor.address.city}<br />
          {data.editor.address.country}
        </address>
        {#if data.editor.contact.email || data.editor.contact.phone}
          <p>
            {#if data.editor.contact.name}<strong>{data.editor.contact.name}</strong><br />{/if}
            {#if data.editor.contact.email}Email : <a href={mailtoContact()}
                >{data.editor.contact.email}</a
              ><br />{/if}
            {#if data.editor.contact.phone}Téléphone : <a
                href="tel:{data.editor.contact.phone.replace(/\s/g, '')}"
                >{data.editor.contact.phone}</a
              >{/if}
          </p>
        {/if}
        <p>
          <strong>Réseaux sociaux</strong><br />
          {#each data.editor.socials as social (social.url)}
            <a href={social.url}>{social.text}</a><br />
          {/each}
        </p>
        {#if data.editor.vcf_file}
          <Button link={{
            url:data.editor.vcf_file,
            text: "Ajouter à mon carnet d'adresse",
            color: "secondary",
            icon_after: "download"
          }} class="w-full" download={data.editor.vcf_file.split('/').pop()}/>
        {/if}
      </article>
    </aside>
  </TwoCols>
</main>
