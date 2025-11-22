<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Image } from "$lib/server/data"

  let props: {
    bgImage?: Image,
    fgImage?: Image,
    content: string,
    class?: ClassValue,
  } = $props()

  const bgImage = props.bgImage ? `background-image: url(${props.bgImage.src})` : ""
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
    {@html props.content}
  </div>
  {#if props.fgImage}
  <img src={props.fgImage.src} alt={props.fgImage.alt} />
  {/if}
</div>