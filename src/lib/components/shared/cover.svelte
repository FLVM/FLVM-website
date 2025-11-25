<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Cover, Image } from "$lib/server/data"
	import Button from "./button.svelte";

  let props: {
    cover: Cover,
    class?: ClassValue,
  } = $props()

  const bgImage = props.cover.image ? `background-image: url(${props.cover.image.src})` : ""
</script>
<div
  class={[
    "mb-8 md:pb-0 md:min-h-100 md:grid grid-cols-2 typo typo-lg bg-no-repeat bg-bottom-right",
    bgImage && 'pb-120'
  ]}
  style={
    "grid-column: 1 / 3;"
    + bgImage
  }
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