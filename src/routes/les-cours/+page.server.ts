import { courses, team, places, editor } from '$lib/server/data';
import type { PageMetadata } from '../../app';

const meta: PageMetadata = {
  title: courses.seo.title,
  description: courses.seo.description,
  canonical: `${editor.base_url}/les-cours`,
  social: {
    title: courses.seo.title,
    type: 'website',
    url: `${editor.base_url}/les-cours`,
    image: courses.cover.image?.src
  }
};
export function load() {
  return { courses, team, places, meta };
}
