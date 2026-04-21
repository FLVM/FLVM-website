import { BASE_URL } from '$env/static/private';
import { pricelist } from '$lib/server/data';
import type { PageMetadata } from '../../app';
import type { PageServerLoad } from './$types';

const meta: PageMetadata = {
  title: pricelist.seo.title,
  description: pricelist.seo.description,
  canonical: `${BASE_URL}/tarifs`,
  social: {
    title: pricelist.seo.title,
    description: pricelist.seo.description,
    type: 'website',
    url: `${BASE_URL}/tarifs`,
    image: pricelist.cover.image?.src
  }
};
export const load: PageServerLoad = () => {
  return { pricelist, meta };
};
