import { about, editor, places, team } from "$lib/server/data"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = () => {
  return { about, editor, places, team }
}