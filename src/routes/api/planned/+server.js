import { json } from '@sveltejs/kit';
import { addPlannedActivity, getPlannedActivities } from '$lib/server/repositories.js';
import { jsonError, readJson } from '$lib/server/apiErrors.js';

export async function GET({ locals }) {
	return json({ plannedActivities: await getPlannedActivities(locals.user.id) });
}

export async function POST({ request, locals }) {
	try {
		const { activityId, ...details } = await readJson(request);
		const plannedActivity = await addPlannedActivity(activityId, details, locals.user.id);
		return json({ plannedActivity }, { status: 201 });
	} catch (issue) {
		return jsonError(issue, 'Aktivitaet konnte nicht geplant werden.');
	}
}
