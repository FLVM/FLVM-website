import { BASE_URL } from '$env/static/private';
import { courses, team, places } from '$lib/server/data';
import type { PageMetadata } from '../../app';

const meta: PageMetadata = {
  title: courses.seo.title,
  description: courses.seo.description,
  canonical: `${BASE_URL}/les-cours`,
  social: {
    title: courses.seo.title,
    type: 'website',
    url: `${BASE_URL}/les-cours`,
    image: courses.cover.image?.src
  }
};
export function load() {
  return { courses, team, places, meta };
}
