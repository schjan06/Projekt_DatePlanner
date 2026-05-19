import { json } from '@sveltejs/kit';
import { addUserReview, getReviews } from '$lib/server/repositories.js';
import { jsonError, readJson } from '$lib/server/apiErrors.js';

export async function GET({ url }) {
	const activityId = url.searchParams.get('activityId');
	return json({ reviews: activityId ? await getReviews(activityId) : [] });
}

export async function POST({ request, locals }) {
	try {
		const review = await addUserReview(await readJson(request), locals.user.id);
		return json({ review }, { status: 201 });
	} catch (issue) {
		return jsonError(issue, 'Bewertung konnte nicht gespeichert werden.');
	}
}
