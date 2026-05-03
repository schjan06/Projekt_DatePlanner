import { json } from '@sveltejs/kit';
import { addReview, getReviews } from '$lib/server/repositories.js';

export async function GET({ url }) {
	const activityId = url.searchParams.get('activityId');
	return json({ reviews: activityId ? await getReviews(activityId) : [] });
}

export async function POST({ request }) {
	const review = await addReview(await request.json());
	return json({ review }, { status: 201 });
}
