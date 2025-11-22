<script lang="ts">
	import type { Link } from "$lib/server/data"
	import { ArrowLeft, ArrowRight, Cake, Calendar, ChefHat, Cookie, CookingPot, Croissant, ExternalLink, Facebook, Gift, Heart, IceCreamCone, Instagram, Mail, PartyPopper, Send, Star, Twitter, type IconProps } from "@lucide/svelte"
  import type { Component } from "svelte"
  import type { ClassValue } from "svelte/elements"

  let props: { link: Link, class?: ClassValue, onclick?:() => void } = $props()

  const icons: {[id: string]: Component<IconProps, {}, ""> } = {
    "arrow-left": ArrowLeft,
    "arrow-right": ArrowRight,
    "calendar": Calendar,
    "cake": Cake,
    "cookie": Cookie,
    "ice-cream-cone": IceCreamCone,
    "croissant":Croissant,
    "cooking-pot": CookingPot,
    "chef-hat": ChefHat,
    "heart": Heart,
    "gift": Gift,
    "mail": Mail,
    "send": Send,
    "star": Star,
    "party-popper": PartyPopper,
    "facebook": Facebook,
    "instagram": Instagram,
    "twitter": Twitter,
    "external-link": ExternalLink
  }

  // Version SSR
  const IconBefore = props.link.icon_before && icons[props.link.icon_before || ""]
  const IconAfter = props.link.icon_after && icons[props.link.icon_after]

  const classes = typeof props.class === "string" ? props.class.split(" ") : Array.isArray(props.class) ? props.class : ""
  const iconSize =
    classes.includes("btn-sm") ? 16 :
    classes.includes("btn-lg") ? 25 : 18
</script>


{#if props.link.icon_only}
<a href={props.link.url} class={[
  // "btn",
  `size-[${iconSize}px]`,
  IconBefore || IconAfter && "btn-icon",
  !props.link.color && "preset-tonal-primary",
  props.link.color  && `preset-filled-${props.link.color}`,
  props.class
  ]}
  title={props.link.text}
  aria-label={props.link.text}
  onclick={props.onclick && props.onclick}
>
  {#if IconBefore}<IconBefore size={iconSize} />{/if}
  {#if IconAfter}<IconAfter size={iconSize} />{/if}
</a>
{:else}
<a href={props.link.url} class={[
  // "preset-filled-primary-500",
  "btn",
  // "btn-sm",
  // "md:btn-base",
  // IconBefore || IconAfter && "btn-icon",$
  !props.link.color && "hover:preset-tonal",
  props.link.color  && `preset-filled-${props.link.color}`,
  props.class
  ]}
  onclick={props.onclick && props.onclick}
>
  {#if IconBefore}<IconBefore size={iconSize} />{/if}
  {props.link.text}
  {#if IconAfter}<IconAfter size={iconSize}/>{/if}
</a>
{/if}
