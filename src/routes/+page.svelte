<script lang="ts">
  import Full from '$lib/components/layout/full.svelte';
  import TwoCols from '$lib/components/layout/two-cols.svelte';
  import Button from '$lib/components/shared/button.svelte';
  import Card from '$lib/components/shared/card.svelte';
  import CalendarEvent from '$lib/components/calendar/event.svelte';

  let { data } = $props();
</script>

<Full
  class="hero -mt-8 h-[min-content] min-h-[calc(100vh-96px)] bg-red-500"
  style={`background-color: white; background-image: url(${data.home.cover.image?.src});` +
    'box-shadow: rgba(99,99,99, 0.2) 0px 3px 3px;'}
>
  <div class="hero-content bg-surface-950/40 text-surface-contrast-950">
    <div class="typo typo-lg">
      {#if data.home.cover.title}
        {#if data.home.cover.overhead}
          <div class="tagline">{data.home.cover.overhead}</div>
        {/if}
        <h1>{data.home.cover.title}</h1>
      {/if}
      {#if data.home.cover.text}
        {@html data.home.cover.text}
      {/if}
      {#if data.home.cover.link}
        <Button link={data.home.cover.link} class="mt-2 btn-lg" />
      {/if}
    </div>
  </div>
</Full>
<TwoCols>
  <main class="cards pr-8">
    {#each data.home.cards as block (block.title)}
      <Card card={block} size="base" class="my-6" />
    {/each}
    {#if data.home.posts}
      <section class="mt-12 typo">
        <h2>Ça c'est passé à FLVM</h2>
        <div class="-mt-6 flex">
          {#each data.home.posts as post (post.title)}
            <Card card={post} size="sm" class="my-6 max-w-1/2" noShadow />
          {/each}
        </div>
      </section>
    {/if}
  </main>
  <aside class="cards mt-6 preset-tonal p-6 pt-2">
    {#if data.lastEvents.length > 0}
      <section>
        <h1 class="h5">Il reste des places !</h1>
        {#each data.lastEvents as event (event.id)}
          <CalendarEvent {event} contact={data.editor.contact.email} class="mt-3 mb-3" />
          <hr class="hr" />
        {/each}
        <Button
          link={{
            text: 'Voir le planning',
            url: '/planning#planning',
            color: 'secondary'
          }}
          class="w-full"
        />
      </section>
    {/if}
    {#each data.home.aside as block (block.title)}
      <Card card={block} size="sm" class="my-4 last:pb-0" />
    {/each}
  </aside>
</TwoCols>
