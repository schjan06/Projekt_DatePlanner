import { json } from '@sveltejs/kit';
import { deletePlannedActivity, updatePlannedActivity } from '$lib/server/repositories.js';

export async function PATCH({ params, request, locals }) {
	try {
		const plannedActivity = await updatePlannedActivity(params.id, await request.json(), locals.user.id);
		return json({ plannedActivity });
	} catch (issue) {
		return json(
			{
				error: issue.body?.message || issue.message || 'Geplante Aktivität konnte nicht aktualisiert werden.',
				fieldErrors: issue.fieldErrors || {}
			},
			{ status: issue.status || 500 }
		);
	}
}

export async function DELETE({ params, locals }) {
	try {
		await deletePlannedActivity(params.id, locals.user.id);
		return json({ success: true });
	} catch (issue) {
		return json(
			{
				error: issue.body?.message || issue.message || 'Geplante Aktivität konnte nicht entfernt werden.'
			},
			{ status: issue.status || 500 }
		);
	}
}
