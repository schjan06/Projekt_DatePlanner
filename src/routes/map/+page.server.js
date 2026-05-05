import { getMapActivitiesByPlace } from '$lib/server/repositories.js';

export async function load() {
	return {
		activities: await getMapActivitiesByPlace('')
	};
}
