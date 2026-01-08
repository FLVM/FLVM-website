import { getEvents } from '$lib/calendar/eventsCalendar';
import type { PageLoad } from './$types';


export const load: PageLoad = async ({ fetch, data }) => {
	return {
		booking: data.booking,
		eventsCalendar: await getEvents()
	};
};

