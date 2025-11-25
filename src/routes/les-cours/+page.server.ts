import { courses, team, places } from '$lib/server/data';

export function load() {
	return { courses, team, places };
}
