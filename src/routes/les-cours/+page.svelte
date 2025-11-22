<script lang="ts">
	import Person from "$lib/components/courses/person.svelte"
	import Debug from "$lib/components/debug.svelte"
  import TwoCols from "$lib/components/layout/two-cols.svelte"
	import Card from "$lib/components/shared/card.svelte"
	import coverImage from "$lib/assets/cover-cours.jpg"
	import Place from "$lib/components/courses/place.svelte"
	import Button from "$lib/components/shared/button.svelte"
	import Cover from "$lib/components/shared/cover.svelte"

  let { data } = $props()

  const getPlaceByName = (name: string) => {
    return data.places.find( place => place.name === name)
  }

  const getPersonByName = (name: string) => {
    return data.team.find( person => person.name === name)
  }

</script>
<main>
  <TwoCols>
    <Cover
      bgImage={{
        src: coverImage,
        alt: "Illustration de couverture"
      }}
      content={data.courses.content}
    />
    <div class="pr-8">
      {#each data.courses.lessons as lesson}
      <article class="mb-12 last:border-0 last:pb-0 text-center md:text-left">
        <!-- Cover -->
        <div class="typo mb-6">
          <h2>{lesson.title}</h2>
          {@html lesson.description}
        </div>
        <div class="typo typo-insert mb-6 text-left">
          <Place place={getPlaceByName(lesson.place)} />
          <Person person={getPersonByName(lesson.instructor)} />
        </div>
        {#if lesson.link}
        <Button link={lesson.link} class="m-auto"/>
        {/if}
      </article>
      {/each}
      <Debug data={data.courses} />
    </div>
    {#if data.courses.cards}
    <aside class="mt-11">
      {#each data.courses.cards as card}
      <Card card={card} size="sm" class="my-4 last:pb-0" />
      {/each}
    </aside>
    {/if}
  </TwoCols>
</main>  
