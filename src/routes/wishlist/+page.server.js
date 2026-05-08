import { getWishlistActivities, getWishlistIds } from '$lib/server/repositories.js';

export async function load({ locals }) {
	const [activities, wishlistIds] = await Promise.all([getWishlistActivities(locals.user.id), getWishlistIds(locals.user.id)]);
	return { activities, wishlistIds };
}
