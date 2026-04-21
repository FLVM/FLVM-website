import { getEvents } from '$lib/calendar/eventsCalendar';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
  return {
    booking: data.booking,
    meta: data.meta,
    eventsCalendar: await getEvents()
  };
};
