import { json } from '@sveltejs/kit';
import { addUserReview, getReviews } from '$lib/server/repositories.js';

export async function GET({ url }) {
	const activityId = url.searchParams.get('activityId');
	return json({ reviews: activityId ? await getReviews(activityId) : [] });
}

export async function POST({ request, locals }) {
	const review = await addUserReview(await request.json(), locals.user.id);
	return json({ review }, { status: 201 });
}
