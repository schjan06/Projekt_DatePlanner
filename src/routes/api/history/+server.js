import { json } from '@sveltejs/kit';
import { getHistoryItems } from '$lib/server/repositories.js';

export async function GET({ locals }) {
	return json({ historyItems: await getHistoryItems(locals.user.id) });
}
