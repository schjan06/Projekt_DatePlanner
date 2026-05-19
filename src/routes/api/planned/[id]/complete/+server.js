import { json } from '@sveltejs/kit';
import { completePlannedActivity } from '$lib/server/repositories.js';
import { jsonError } from '$lib/server/apiErrors.js';

export async function POST({ params, locals }) {
	try {
		const historyItem = await completePlannedActivity(params.id, locals.user.id);
		return json({ historyItem }, { status: 201 });
	} catch (issue) {
		return jsonError(issue, 'Geplante Aktivitaet konnte nicht abgeschlossen werden.');
	}
}
