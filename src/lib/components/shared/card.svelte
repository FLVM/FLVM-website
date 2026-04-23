<script lang="ts">
  import type { Card } from '$lib/server/data';
  import type { ClassValue } from 'svelte/elements';
  import Button from './button.svelte';
  import type { Snippet } from 'svelte';

  type CardSizes = 'sm' | 'base' | 'lg';
  let props: {
    card: Card;
    size?: CardSizes;
    class?: ClassValue;
    noShadow?: boolean;
    children?: Snippet;
  } = $props();
</script>

<article
  class={[
    props.class,
    'card',
    props.size === 'sm' && 'card-sm',
    props.size === undefined && 'card-base',
    props.size === 'lg' && 'card-lg',
    props.card.featured && 'card-featured'
  ]}
  style={props.noShadow ? null : 'box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'}
>
  {#if props.card.image}
    <figure class="card-figure">
      <img src={props.card.image?.src} alt={props.card.image?.alt} />
      {#if props.card.image?.legend}
        <figcaption class="card-caption">
          {@html props.card.image?.legend}
        </figcaption>
      {/if}
    </figure>
  {/if}
  <div class="card-body max-md:px-2">
    {#if props.card.content || props.card.title}
      <h2>{props.card.title}</h2>
      {#if props.card.content}
        {@html props.card.content}
      {/if}
      {#if props.children}
        {@render props.children()}
      {/if}
    {/if}
    {#if props.card.link}
      <div class="card-actions">
        <Button link={props.card.link} class="btn-md btn-wide w-full" />
      </div>
    {/if}
  </div>
</article>
