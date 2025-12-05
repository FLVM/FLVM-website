import { getLastEvents } from '$lib/calendar/eventsCalendar';
import type { PageLoad } from './$types';


export const load: PageLoad = async () => {
	return {
    lastEvents: await getLastEvents()
	};
};

