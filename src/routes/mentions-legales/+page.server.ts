import { legals } from '$lib/server/data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  return { legals };
};