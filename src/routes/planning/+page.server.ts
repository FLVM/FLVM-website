import { booking, editor } from '$lib/server/data';
import type { PageMetadata } from '../../app';
import type { PageServerLoad } from './$types';

const meta: PageMetadata = {
  title: booking.seo.title,
  description: booking.seo.description,
  canonical: `${editor.base_url}/planning`,
  social: {
    title: booking.seo.title,
    description: booking.seo.description,
    type: 'website',
    url: `${editor.base_url}/planning`
  }
};

export const load: PageServerLoad = async () => {
  return { booking, meta };
};
