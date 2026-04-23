// Données traités coté serveur uniquement
// https://svelte.dev/docs/kit/load#Universal-vs-server-When-to-use-which
import type { PageMetadata } from '../app';
import type { PageServerLoad } from './$types';
import { editor, home } from '$lib/server/data';

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
};

export const load: PageServerLoad = async () => {
  return {
    ...meta
  };
};
