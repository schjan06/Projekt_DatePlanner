import { getPlannedActivities } from '$lib/server/repositories.js';

export async function load({ locals }) {
	return { plannedActivities: await getPlannedActivities(locals.user.id) };
}
