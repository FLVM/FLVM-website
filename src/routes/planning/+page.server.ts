import { BASE_URL } from '$env/static/private';
import { booking } from '$lib/server/data';
import type { PageMetadata } from '../../app';
import type { PageServerLoad } from './$types';

const meta: PageMetadata = {
  title: booking.seo.title,
  description: booking.seo.description,
  canonical: `${BASE_URL}/planning`,
  social: {
    title: booking.seo.title,
    description: booking.seo.description,
    type: 'website',
    url: `${BASE_URL}/planning`
  }
};

export const load: PageServerLoad = async () => {
  return { booking, meta };
};
