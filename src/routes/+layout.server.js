import { getProfile, getWishlistIds } from '$lib/server/repositories.js';

export async function load() {
	const [wishlistIds, profile] = await Promise.all([getWishlistIds(), getProfile()]);
	return {
		wishlistIds,
		wishlistCount: wishlistIds.length,
		profile
	};
}
