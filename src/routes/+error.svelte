<script lang="ts">
  import { page } from "$app/state"
  import Button from "$lib/components/shared/button.svelte"
	import OneCol from "$lib/components/layout/one-col.svelte"
  
  let{ data } = $props()
</script>
<OneCol class="mt-12">
  <main class="typo">
    <h1>{page.status}: {page.error?.message}</h1>
    {#if page.status === 404}
    <p>Désolé, la page <code>{page.url.pathname}</code> que vous recherchez ne semble pas exister.</p>
    {:else}
    <p>Désolé, il semble qu'il y ait un problème pour charger cette page.</p>
    <p>Veuillez tenter de recharger la page plus tard, si cela ne corrige pas le problème, veuiller contacter l'administrateur du site.</p>
    {/if}
    <Button link={{ url: "/", text: "Retourner sur la page d'accueil", icon_before: "arrow-left", color: "surface-950-50" }}/>
  </main>
</OneCol>
