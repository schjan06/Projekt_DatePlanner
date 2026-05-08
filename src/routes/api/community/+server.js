import { json } from '@sveltejs/kit';
import { addCommunityPost, getCommunityPosts } from '$lib/server/repositories.js';

export async function GET() {
	return json({ communityPosts: await getCommunityPosts() });
}

export async function POST({ request, locals }) {
	const post = await addCommunityPost(await request.json(), locals.user.id);
	return json({ post }, { status: 201 });
}
