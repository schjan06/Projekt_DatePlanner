import { json } from '@sveltejs/kit';
import { addCommunityPost } from '$lib/server/repositories.js';

export async function POST({ request }) {
	const body = await request.json();
	const post = await addCommunityPost({
		activityId: body.activityId,
		text: body.text || body.message,
		visibility: body.visibility || 'Öffentlich'
	});
	return json({ post }, { status: 201 });
}
