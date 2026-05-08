import { json } from '@sveltejs/kit';
import { addPlannedActivity, getPlannedActivities } from '$lib/server/repositories.js';

export async function GET({ locals }) {
	return json({ plannedActivities: await getPlannedActivities(locals.user.id) });
}

export async function POST({ request, locals }) {
	const { activityId, ...details } = await request.json();
	const plannedActivity = await addPlannedActivity(activityId, details, locals.user.id);
	return json({ plannedActivity }, { status: 201 });
}
