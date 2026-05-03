import { json } from '@sveltejs/kit';
import { getHistoryItems } from '$lib/server/repositories.js';

export async function GET() {
	return json({ historyItems: await getHistoryItems() });
}
