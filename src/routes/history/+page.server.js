import { getHistoryItems } from '$lib/server/repositories.js';

export async function load({ locals }) {
	return { historyItems: await getHistoryItems(locals.user.id) };
}
