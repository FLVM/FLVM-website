<script lang="ts">
import type { Card } from "$lib/server/data"
import type { ClassValue } from "svelte/elements"
import Button from "./button.svelte"

type CardSizes = "sm" | "base" | "lg"
let props : { card: Card, size?: CardSizes, class?: ClassValue, noShadow?: boolean } = $props()
const card = props.card
const size = props.size || "base"
</script>
<article class={[
  props.class,
  "card",
  size === "sm" && "card-sm",
  size === "base" && "card-base",
  size === "lg" && "card-lg",
  card.featured && "card-featured"
]}
  style={ props.noShadow ? null : "box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" }
>
  {#if card.image}
  <figure class="card-figure">
    <img
      src={card.image.src}
      alt={card.image.alt}
      />
    {#if card.image.legend }
    <figcaption class="card-caption">
    {@html card.image.legend}
    </figcaption>
    {/if}
  </figure>
  {/if}
  <div class="card-body">
    {#if card.content || card.title }
      <h2>{card.title}</h2>
      {#if card.content}
       {@html card.content}
      {/if}
    {/if}
    {#if card.link}
    <div class="card-actions">
      <Button link={card.link} class={`btn-${size} btn-wide w-full`} />
    </div>
    {/if}
  </div>
</article>
