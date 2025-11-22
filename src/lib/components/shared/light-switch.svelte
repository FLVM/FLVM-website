<script lang="ts">
	import { Moon, Sun } from "@lucide/svelte"
	import { Switch } from "@skeletonlabs/skeleton-svelte"
  
  let checked = $state(false)
  $effect(() => {
    console.log("Mode checked", checked)
    const mode = localStorage.getItem("mode") || "light"
    checked = mode === "dark"
  })

  const onCheckedChange = (event: { checked: boolean }) => {
    const mode = event.checked ? "dark" : "light"
    console.log("Mode", mode)
    document.documentElement.setAttribute("data-mode", mode)
    localStorage.setItem("mode", mode)
    checked = event.checked
  }
</script>
<svelte:head>
  <script>
    const themeMode = localStorage.getItem("themeMode") || "light"
    document.documentElement.setAttribute("data-mode", themeMode)
  </script>
</svelte:head>

<Switch {checked} {onCheckedChange}>
  <Switch.Label>
    {#if checked}
    <Sun/>
    {:else}
    <Moon/>
    {/if}
  </Switch.Label>
  <Switch.HiddenInput />
</Switch>