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

export async function getEvents() {
  // Documentation: https://developers.google.com/workspace/calendar/api/v3/reference/events/list#parameters
	const calendarApiResponse = await fetch(url + new URLSearchParams(params).toString()).then(
		(result) => {
			// console.log("RESULT", result)
			return result.json();
		}
	);
	const eventsCalendar: Array<CalendarEventType> = calendarApiResponse.items
		.filter((i: CalendarEventType) => Boolean(i.summary))
		.map(
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

  return eventsCalendar
}

export async function getLastEvents() {
  // Les derniers events
  const lastEvents = await getEvents()
  return lastEvents
    .filter(e => e.transparency === "transparent")
    .slice(0,3)
}

// Utilities

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

export const categories = [
	'cuisine',
	'pâtisserie',
	// 'patisserie',
	'confiserie',
	'enfants'
	// ':'
];

function getTitle(string: string) {
  const pattern = new RegExp(categories.join("|") + "|:", "gi")
	let title = string.replace(pattern, '').trim();
	return title.charAt(0).toUpperCase() + title.slice(1);
}

function getTags(string: string) {
	const tags: Array<string> = [];
	const words: Array<string> = string
		.split(/[\s:]+/)
		.filter((w) => w.trim() !== ':')
		.map((w) => w.toLocaleLowerCase());
	categories.forEach((w) => {
		if (words.includes(w)) tags.push(w.toLocaleLowerCase());
	});
	return tags;
}
