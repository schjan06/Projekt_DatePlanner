import { json } from '@sveltejs/kit';
import { updateHistoryItem } from '$lib/server/repositories.js';

export async function PATCH({ params, request, locals }) {
	try {
		const historyItem = await updateHistoryItem(params.id, await request.json(), locals.user.id);
		return json({ historyItem });
	} catch (error) {
		return json(
			{
				error: error.message || 'Erinnerung konnte nicht gespeichert werden.',
				fieldErrors: error.fieldErrors || {}
			},
			{ status: error.status || 500 }
		);
	}
}
