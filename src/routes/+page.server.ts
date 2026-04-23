import { getLastEvents } from '$lib/calendar/eventsCalendar';
import { editor, home } from '$lib/server/data';
import type { PageMetadata } from '../app';

const meta: PageMetadata = {
  title: home.seo.title,
  description: home.seo.description,
  canonical: `${editor.base_url}`,
  social: {
    title: home.seo.title,
    type: 'website',
    url: `${editor.base_url}`,
    image: home.cover.image?.src
  }
}

export function load() {
  return {
    lastEvents: [],
    meta
  };
};

// @todo: comment concilier le charchement coté serveur, avec 
// des données dynamique ?
// import { getLastEvents } from '$lib/calendar/eventsCalendar';
// import type { PageLoad } from './$types';


// export const load: PageLoad = async () => {
//   return {
//     lastEvents: await getLastEvents(),
//   };
// };
