import { getHistoryItems } from '$lib/server/repositories.js';

export async function load() {
	return { historyItems: await getHistoryItems() };
}
