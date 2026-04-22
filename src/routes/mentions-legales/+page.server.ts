import { editor, legals } from '$lib/server/data';
import type { PageMetadata } from '../../app';
import type { PageServerLoad } from './$types';

const meta: PageMetadata = {
  title: legals.seo.title,
  description: legals.seo.description,
  canonical: `${editor.base_url}/mentions-legales`
};

export const load: PageServerLoad = () => {
  return { legals, meta };
};
