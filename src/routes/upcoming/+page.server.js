import { getPlannedActivities } from '$lib/server/repositories.js';

export async function load() {
	return { plannedActivities: await getPlannedActivities() };
}
