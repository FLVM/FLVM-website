<script lang="ts">
  import type { Cover } from '$lib/server/data';
  import Button from './button.svelte';

  let props: {
    cover: Cover;
    // class?: ClassValue;
  } = $props();

  const bgImage = (() =>
    props.cover.image ? `background-image: url(${props.cover.image.src})` : '')();
</script>

<div
  class={[
    'mx-auto mb-8 grid-cols-2 typo bg-bottom-right bg-no-repeat typo-lg md:grid md:min-h-100 md:max-w-500 md:bg-top-right md:pb-0',
    bgImage && 'pb-120'
    // 'bg-primary-500 p-12 -mt-12'
  ]}
  style={'grid-column: 1 / 3;' + bgImage}
>
  <div>
    {#if props.cover.overhead}
      <div class="tagline">{props.cover.overhead}</div>
    {/if}
    <h1>{props.cover.title}</h1>
    {@html props.cover.text}
    {#if props.cover.link}
      <Button link={props.cover.link} class="mt-2 btn-lg" />
    {/if}
  </div>
</div>
