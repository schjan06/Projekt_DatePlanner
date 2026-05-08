import { getActivities, getCategories, getFeaturedActivities, getWishlistIds } from '$lib/server/repositories.js';

export async function load({ url, locals }) {
	const search = url.searchParams.get('search') || '';
	const userId = locals.user.id;
	const [activities, featuredActivities, categories, wishlistIds] = await Promise.all([
		getActivities({ search }),
		getFeaturedActivities(3),
		getCategories(),
		getWishlistIds(userId)
	]);

	return {
		activities,
		featuredActivities,
		categories,
		wishlistIds,
		search
	};
}
