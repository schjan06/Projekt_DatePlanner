import { json } from '@sveltejs/kit';
import { getProfile, updateProfile } from '$lib/server/repositories.js';

export async function GET({ locals }) {
	return json({ profile: await getProfile(locals.user.id) });
}

export async function PUT({ request, locals }) {
	try {
		const profile = await updateProfile(locals.user.id, await request.json());
		return json({ profile });
	} catch (issue) {
		return json({ error: issue.message || 'Profil konnte nicht gespeichert werden.' }, { status: issue.status || 400 });
	}
}
