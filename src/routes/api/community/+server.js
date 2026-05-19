import { json } from '@sveltejs/kit';
import { addCommunityPost, getCommunityPosts } from '$lib/server/repositories.js';
import { jsonError, readJson } from '$lib/server/apiErrors.js';

export async function GET() {
	return json({ communityPosts: await getCommunityPosts() });
}

export async function POST({ request, locals }) {
	try {
		const post = await addCommunityPost(await readJson(request), locals.user.id);
		return json({ post }, { status: 201 });
	} catch (issue) {
		return jsonError(issue, 'Beitrag konnte nicht gespeichert werden.');
	}
}
