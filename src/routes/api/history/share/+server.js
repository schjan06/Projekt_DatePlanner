import { json } from '@sveltejs/kit';
import { addCommunityPost } from '$lib/server/repositories.js';

export async function POST({ request, locals }) {
	const body = await request.json();
	const post = await addCommunityPost({
		activityId: body.activityId,
		text: body.text || body.message,
		visibility: body.visibility || 'Öffentlich'
	}, locals.user.id);
	return json({ post }, { status: 201 });
}
