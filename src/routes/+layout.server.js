import { getProfile, getWishlistIds } from '$lib/server/repositories.js';

export async function load({ locals, url }) {
	if (!locals.user) {
		return {
			user: null,
			isLogin: url.pathname === '/login',
			wishlistIds: [],
			wishlistCount: 0,
			profile: null
		};
	}

	const [wishlistIds, profile] = await Promise.all([getWishlistIds(locals.user.id), getProfile(locals.user.id)]);
	return {
		user: locals.user,
		isLogin: false,
		wishlistIds,
		wishlistCount: wishlistIds.length,
		profile
	};
}
