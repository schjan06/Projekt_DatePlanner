import { getActivities, getCategories, getFeaturedActivities, getWishlistIds } from '$lib/server/repositories.js';

export async function load({ url }) {
	const search = url.searchParams.get('search') || '';
	const [activities, featuredActivities, categories, wishlistIds] = await Promise.all([
		getActivities({ search }),
		getFeaturedActivities(3),
		getCategories(),
		getWishlistIds()
	]);

	return {
		activities,
		featuredActivities,
		categories,
		wishlistIds,
		search
	};
}
