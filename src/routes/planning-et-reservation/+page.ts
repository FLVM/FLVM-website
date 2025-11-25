import type { PageLoad } from './$types';
const { VITE_CALENDAR_ID, VITE_CALENDAR_API_KEY } = import.meta.env;

// Google Calendar Event ressource :
// https://developers.google.com/workspace/calendar/api/v3/reference/events?hl=fr
export type CalendarEventType = {
	id: string;
	status: 'confirmed' | 'tentative' | 'cancelled';
	htmlLink: string;
	created: string;
	updated: string;
	title: string;
	tags: Array<string>;
	summary: string;
	description: string;
	location: string;
	creator: {
		email: string;
	};
	organizer: {
		email: string;
		displayName: string;
	};
	start: {
		dateTime: string;
		prettyDate: string;
		prettyHour: string;
	};
	end: {
		dateTime: string;
		prettyDate: string;
		prettyHour: string;
	};
	transparency: 'opaque' | 'transparent' | null; // equivant à Occupé et Disponible
	visibility: 'default' | 'public' | 'private' | 'confidential' | null;
};

const url = `https://www.googleapis.com/calendar/v3/calendars/${VITE_CALENDAR_ID}/events?`;
const params: Record<string, string> = {
	key: VITE_CALENDAR_API_KEY || '',
	orderBy: 'startTime',
	singleEvents: 'true',
	timeMin: '2025-11-15T10:07:25.123Z',
	timeMax: '2026-11-15T10:07:25.123Z'
};

export const load: PageLoad = async ({ fetch, data }) => {
	// https://www.googleapis.com/calendar/v3/calendars/assoflvm@gmail.com/events?key=AIzaSyBQyXHsS-OMgEw9MfhhZ_9WtCEXAtyf-RI&orderBy=startTime&singleEvents=true&timeMin=2025-11-15T10%3A07%3A25.123Z
	// console.log("FETCH", url + new URLSearchParams(params).toString())
	const calendarApiResponse = await fetch(url + new URLSearchParams(params).toString()).then(
		(result) => {
			// console.log("RESULT", result)
			return result.json();
		}
	);
	const eventsCalendar: Array<CalendarEventType> = calendarApiResponse.items.map(
		(i: CalendarEventType) => ({
			id: i.id,
			status: i.status,
			htmlLink: i.htmlLink,
			created: i.created,
			updated: i.updated,
			summary: i.summary,
			title: getTitle(i.summary),
			tags: getTags(i.summary),
			description: i.description,
			location: i.location,
			creator: {
				email: i.creator.email
			},
			organizer: {
				email: i.organizer.email,
				displayName: i.organizer.displayName
			},
			start: {
				dateTime: i.start.dateTime,
				prettyDate: getPrettyDate(i.start.dateTime),
				prettyHour: getPrettyHour(i.start.dateTime)
			},
			end: {
				dateTime: i.end.dateTime,
				prettyDate: getPrettyDate(i.end.dateTime),
				prettyHour: getPrettyHour(i.end.dateTime)
			},
			transparency: i.transparency || 'opaque',
			visibility: i.visibility || null
		})
	);

	// console.log("EVENT FROM API", eventsCalendar)

	return {
		booking: data.booking,
		eventsCalendar
	};
};

const defaultPrettyDateLocale: Intl.LocalesArgument = 'fr-FR';
const defaultPrettyDateOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	weekday: 'long',
	day: 'numeric'
};

function getPrettyDate(
	date: string,
	locale?: Intl.LocalesArgument,
	options?: Intl.DateTimeFormatOptions
) {
	locale = locale || defaultPrettyDateLocale;
	options = options || defaultPrettyDateOptions;
	return new Date(date).toLocaleDateString(locale, options);
}

function getPrettyHour(date: string) {
	const d = new Date(date);
	return `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
}

const wordsList = [
	'cuisine',
	'pâtisserie',
	'patisserie',
	'confiserie',
	// "enfant",
	'enfants',
	':'
];

function getTitle(string: string) {
	// Retirer "Cuisine", "Pâtisserie" et ":"
	// wordsList.forEach(w => string.replace(w, ""))
	let title = string.replace(/cuisine|pâtisserie|confiserie|enfants|:/gi, '').trim();
	return title.charAt(0).toUpperCase() + title.slice(1);
}

function getTags(string: string) {
	const tags: Array<string> = [];
	const words: Array<string> = string
		.split(/[\s:]+/)
		.filter((w) => w.trim() !== ':')
		.map((w) => w.toLocaleLowerCase());
	wordsList.forEach((w) => {
		if (words.includes(w)) tags.push(w.toLocaleLowerCase());
	});
	return tags;
}
