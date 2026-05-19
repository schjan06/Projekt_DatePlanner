import { json } from '@sveltejs/kit';
import { deletePlannedActivity, updatePlannedActivity } from '$lib/server/repositories.js';
import { jsonError, readJson } from '$lib/server/apiErrors.js';

export async function PATCH({ params, request, locals }) {
	try {
		const plannedActivity = await updatePlannedActivity(params.id, await readJson(request), locals.user.id);
		return json({ plannedActivity });
	} catch (issue) {
		return jsonError(issue, 'Geplante Aktivitaet konnte nicht aktualisiert werden.');
	}
}

export async function DELETE({ params, locals }) {
	try {
		await deletePlannedActivity(params.id, locals.user.id);
		return json({ success: true });
	} catch (issue) {
		return jsonError(issue, 'Geplante Aktivitaet konnte nicht entfernt werden.');
	}
}
