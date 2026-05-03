import { getWishlistActivities, getWishlistIds } from '$lib/server/repositories.js';

export async function load() {
	const [activities, wishlistIds] = await Promise.all([getWishlistActivities(), getWishlistIds()]);
	return { activities, wishlistIds };
}
