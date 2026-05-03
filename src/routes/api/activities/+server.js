import { json } from '@sveltejs/kit';
import { getActivities, getCategories } from '$lib/server/repositories.js';

export async function GET({ url }) {
	const filters = Object.fromEntries(url.searchParams);
	const [activities, categories] = await Promise.all([getActivities(filters), getCategories()]);
	return json({ activities, categories });
}
