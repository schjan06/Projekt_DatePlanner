import { json } from '@sveltejs/kit';
import { addCommunityPost } from '$lib/server/repositories.js';
import { jsonError, readJson } from '$lib/server/apiErrors.js';

export async function POST({ request, locals }) {
	try {
		const body = await readJson(request);
		const post = await addCommunityPost({
			activityId: body.activityId,
			text: body.text || body.message,
			visibility: body.visibility || 'Öffentlich'
		}, locals.user.id);
		return json({ post }, { status: 201 });
	} catch (issue) {
		return jsonError(issue, 'Vergangene Aktivität konnte nicht geteilt werden.');
	}
}
