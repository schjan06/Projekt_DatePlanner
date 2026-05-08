import { json } from '@sveltejs/kit';
import { updateNotificationSettings } from '$lib/server/repositories.js';

export async function PUT({ request, locals }) {
	try {
		const profile = await updateNotificationSettings(locals.user.id, await request.json());
		return json({ profile });
	} catch (issue) {
		return json({ error: issue.message || 'Benachrichtigungen konnten nicht gespeichert werden.' }, { status: issue.status || 400 });
	}
}
