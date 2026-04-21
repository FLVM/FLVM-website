import { about, editor, places, team } from '$lib/server/data';
import type { PageServerLoad } from './$types';
import { BASE_URL } from '$env/static/private';
import type { PageMetadata } from '../../app';
// Gestion des méta données sur Sveltkit
// @related: /src/app.d.ts, /src/routes/layout.svelte
// https://github.com/sveltejs/svelte/discussions/14240
const meta: PageMetadata = {
  title: about.seo.title,
  description: about.seo.description,
  canonical: `${BASE_URL}/a-propos`,
  social: {
    title: about.seo.title,
    description: about.seo.description,
    type: 'website',
    url: `${BASE_URL}/a-propos`,
    image: about.cover.image?.src
  }
};
export const load: PageServerLoad = () => {
  return { about, editor, places, team, meta };
};
