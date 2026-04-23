<script lang="ts">
  import type { Editor } from '$lib/server/data';
  // Svelte v1, les "Brand icons" doivent être géré en SVG custom
  // https://lucide.dev/guide/svelte/migration
  import { Video, type IconProps } from '@lucide/svelte/icons';
  import Facebook from '$lib/components/shared/icons/facebook.svelte';
  import Twitter from '$lib/components/shared/icons/twitter.svelte';
  import Instagram from '$lib/components/shared/icons/instagram.svelte';
  import type { Component } from 'svelte';
  import type { ClassValue, SVGAttributes } from 'svelte/elements';

  type SocialLink = NonNullable<Editor['socials']>[number];
  let props: {
    link: SocialLink;
    class?: ClassValue;
    size?: 'sm' | 'md' | 'lg';
    onclick?: () => void;
  } = $props();
  const icons: {
    [id: string]: Component<IconProps> | Component<Partial<SVGAttributes<SVGElement>>>;
  } = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    vimeo: Video
  };

  const Icon = (() => props.link.icon && icons[props.link.icon])();
  const iconSize = () => (props.size === 'sm' ? 16 : props.size === 'lg' ? 25 : 18);
</script>

{#if props.link.icon_only}
  <a
    href={props.link.url}
    class={[
      // "anchor",
      'btn-icon',
      `btn-icon-${props.size}`,
      'btn',
      // `size-${iconSize}`,
      props.class
    ]}
    title={props.link.text}
    aria-label={props.link.text}
    onclick={props.onclick && props.onclick}
    >{#if Icon}<Icon size={iconSize()} />{/if}</a
  >
{:else}
  <a
    href={props.link.url}
    class={[
      // "anchor",
      'btn',
      // "btn-icon",
      // `btn-icon-${size}`,
      'flex shrink-0',
      props.class
    ]}
  >
    {#if Icon}<Icon size={iconSize()} style="width: 25px" class="w-{iconSize()}" />{/if}&nbsp;{props
      .link.text}
  </a>
{/if}
