import { json } from '@sveltejs/kit';
import { updatePassword } from '$lib/server/repositories.js';

export async function PUT({ request, locals }) {
	try {
		await updatePassword(locals.user.id, await request.json());
		return json({ success: true });
	} catch (issue) {
		return json({ error: issue.message || 'Passwort konnte nicht geändert werden.' }, { status: issue.status || 400 });
	}
}
