import { json } from '@sveltejs/kit';
import { addPlannedActivity, getPlannedActivities } from '$lib/server/repositories.js';

export async function GET() {
	return json({ plannedActivities: await getPlannedActivities() });
}

export async function POST({ request }) {
	const { activityId, ...details } = await request.json();
	const plannedActivity = await addPlannedActivity(activityId, details);
	return json({ plannedActivity }, { status: 201 });
}
