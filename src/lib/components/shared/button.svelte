<script lang="ts">
  import type { Link } from '$lib/server/data';
  import {
    ArrowLeft,
    ArrowRight,
    Cake,
    Calendar,
    ChefHat,
    Cookie,
    CookingPot,
    Croissant,
    ExternalLink,
    Facebook,
    Gift,
    Heart,
    IceCreamCone,
    Instagram,
    Mail,
    PartyPopper,
    Send,
    Star,
    Twitter,
    type IconProps
  } from '@lucide/svelte';
  import type { Component } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  let props: {
    link: Link;
    class?: ClassValue;
    onclick?: () => void;
    disabled?: boolean;
  } = $props();

  const icons: { [id: string]: Component<IconProps, object, ''> } = {
    'arrow-left': ArrowLeft,
    'arrow-right': ArrowRight,
    calendar: Calendar,
    cake: Cake,
    cookie: Cookie,
    'ice-cream-cone': IceCreamCone,
    croissant: Croissant,
    'cooking-pot': CookingPot,
    'chef-hat': ChefHat,
    heart: Heart,
    gift: Gift,
    mail: Mail,
    send: Send,
    star: Star,
    'party-popper': PartyPopper,
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    'external-link': ExternalLink
  };

  // Version SSR
  const getIconBefore = () => props.link.icon_before && icons[props.link.icon_before];
  const getIconAfter = () => props.link.icon_after && icons[props.link.icon_after];
  const IconBefore = getIconBefore();
  const IconAfter = getIconAfter();

  const classes =
    typeof props.class === 'string'
      ? props.class.split(' ')
      : Array.isArray(props.class)
        ? props.class
        : '';
  const iconSize = classes.includes('btn-sm') ? 16 : classes.includes('btn-lg') ? 25 : 18;

  type presetKeys = Exclude<Link['color'], '' | null | undefined>;
  const preset: { [id in presetKeys]: string } = {
    neutral: '',
    primary: 'preset-filled-primary-500',
    secondary: 'preset-filled-secondary-500',
    dark: 'preset-filled-tertiary-950-50',
    black: 'preset-filled-surface-950-50',
    white: 'preset-filled-surface-50-950'
  };
</script>

<!-- @todo: changer la couleur pour les boutons désactivés -->
{#if props.link.icon_only}
  <a
    href={props.disabled ? null : props.link.url}
    class={[
      'text-shadow',
      `size-[${iconSize}px]`,
      IconBefore || (IconAfter && 'btn-icon'),
      !props.link.color && 'preset-tonal-primary',
      props.link.color && `preset-filled-${props.link.color}`,
      props.class,
      props.disabled && 'disabled cursor-not-allowed'
    ]}
    title={props.link.text}
    aria-label={props.link.text}
    onclick={props.onclick && props.onclick}
  >
    {#if IconBefore}<IconBefore size={iconSize} />{/if}
    {#if IconAfter}<IconAfter size={iconSize} />{/if}
  </a>
{:else}
  <a
    href={props.disabled ? null : props.link.url}
    class={[
      'btn',
      'font-sans',
      'font-bold',
      !props.link.color && 'hover:preset-filled',
      props.link.color &&
        'text-white  [text-shadow:_0px_1px_1px_rgb(0_0_0_/_0.6),_0px_0px_4px_rgb(0_0_0/_0.4)]',
      preset[props.link.color || 'neutral'],
      props.class,
      props.disabled && 'disabled cursor-not-allowed'
    ]}
    onclick={props.onclick && props.onclick}
  >
    {#if IconBefore}<IconBefore size={iconSize} class="drop-shadow-md/40" />{/if}
    {props.link.text}
    {#if IconAfter}<IconAfter size={iconSize} class="drop-shadow-md/40" />{/if}
  </a>
{/if}
