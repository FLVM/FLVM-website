import { editor, pricelist } from '$lib/server/data';
import type { PageMetadata } from '../../app';
import type { PageServerLoad } from './$types';

const meta: PageMetadata = {
  title: pricelist.seo.title,
  description: pricelist.seo.description,
  canonical: `${editor.base_url}/tarifs`,
  social: {
    title: pricelist.seo.title,
    description: pricelist.seo.description,
    type: 'website',
    url: `${editor.base_url}/tarifs`,
    image: pricelist.cover.image?.src
  }
};
export const load: PageServerLoad = () => {
  return { pricelist, meta };
};
