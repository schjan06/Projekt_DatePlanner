import { getActivities, getReviews, getWishlistIds, requireActivity } from '$lib/server/repositories.js';

export async function load({ params }) {
	const activity = await requireActivity(params.id);
	const [reviews, allActivities, wishlistIds] = await Promise.all([getReviews(activity.id), getActivities(), getWishlistIds()]);
	const similarActivities = allActivities
		.filter((item) => item.id !== activity.id && item.categories.some((category) => activity.categories.includes(category)))
		.slice(0, 3);

	return { activity, reviews, similarActivities, wishlistIds };
}
