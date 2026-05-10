import { json } from '@sveltejs/kit';
import { completePlannedActivity } from '$lib/server/repositories.js';

export async function POST({ params, locals }) {
	try {
		const historyItem = await completePlannedActivity(params.id, locals.user.id);
		return json({ historyItem }, { status: 201 });
	} catch (issue) {
		return json(
			{
				error: issue.body?.message || issue.message || 'Geplante Aktivität konnte nicht abgeschlossen werden.'
			},
			{ status: issue.status || 500 }
		);
	}
}
