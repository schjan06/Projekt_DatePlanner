import { json } from '@sveltejs/kit';
import { requireActivity, getReviews, getActivities } from '$lib/server/repositories.js';

export async function GET({ params }) {
	const activity = await requireActivity(params.id);
	const [reviews, allActivities] = await Promise.all([getReviews(activity.id), getActivities()]);
	const similarActivities = allActivities
		.filter((item) => item.id !== activity.id && item.categories.some((category) => activity.categories.includes(category)))
		.slice(0, 3);

	return json({ activity, reviews, similarActivities });
}
