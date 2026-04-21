<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import Footer from '$lib/components/layout/footer.svelte';
  import Header from '$lib/components/layout/header.svelte';
  import { error } from '@sveltejs/kit';
  import { page } from '$app/state';

  let { children, data } = $props();

  // Contrôle du mode maintenance
  const maintenance = () => data.maintenance;
  if (maintenance()) {
    throw error(503, 'Site en maintenance');
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <!-- META SEO -->
  <title>{page.data.meta.title}</title>
  <meta name="description" content={page.data.meta.description} />
  <meta name="canonical" content={page.data.meta.canonical} />
  <meta name="robot" content={page.data.meta.robot || 'index, follow'} />
  {#if data.editor.name}
    <meta name="author" content={data.editor.name} />
  {/if}
  {#if page.data.meta.social}
    <!-- Open Graph -->
    <meta name="og:title" content={page.data.meta.social.title} />
    <meta name="og:type" content={page.data.meta.social.type} />
    <meta name="og:url" content={page.data.meta.social.url} />
    {#if page.data.meta.social.description}
      <meta name="og:description" content={page.data.meta.social.description} />
    {/if}
    {#if page.data.meta.social}
      <meta name="og:image" content={page.data.meta.social.image} />
    {/if}
    <meta name="og:site_name" content={page.data.meta.social.site_name || data.editor.site_name} />
    <meta name="og:locale" content={page.data.meta.social.locale || 'fr_FR'} />
  {/if}
</svelte:head>

<Header links={data.links} editor={data.editor} class="mb-8" />
{@render children?.()}
<Footer links={data.navigation} editor={data.editor} class="mt-32" />
