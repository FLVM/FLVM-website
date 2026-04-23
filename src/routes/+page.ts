// Données chargées cotés serveur et coté navigateur
// https://svelte.dev/docs/kit/load#Universal-vs-server-When-to-use-which
import { getLastEvents } from '$lib/calendar/eventsCalendar';
import type { PageMetadata } from '../app';
import type { PageLoad } from './$types';

type Data = {
  data: PageMetadata;
};

export const load: PageLoad = async ({ data }: Data) => {
  return {
    meta: { ...data },
    lastEvents: await getLastEvents()
  };
};
