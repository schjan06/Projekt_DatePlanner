import { defaultFilters } from '$lib/utils/activityFilters.js';
import { getActivities, getCategories, getWishlistIds } from '$lib/server/repositories.js';

export async function load({ url, locals }) {
	const filters = { ...defaultFilters };
	for (const key of Object.keys(filters)) {
		const value = url.searchParams.get(key);
		if (value) filters[key] = value;
	}

	const [activities, categories, wishlistIds] = await Promise.all([getActivities(filters), getCategories(), getWishlistIds(locals.user.id)]);
	return { activities, categories, filters, wishlistIds };
}
