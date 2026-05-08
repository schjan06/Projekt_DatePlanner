import { fail, redirect } from '@sveltejs/kit';
import { authenticateUser, createSession, setSessionCookie } from '$lib/server/auth.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = String(formData.get('username') || '').trim().toLowerCase();
		const password = String(formData.get('password') || '').trim();

		if (!username || !password) {
			return fail(400, {
				error: 'Bitte gib Benutzername und Passwort ein.',
				username
			});
		}

		const user = await authenticateUser(username, password);
		if (!user) {
			return fail(400, {
				error: 'Benutzername oder Passwort ist falsch.',
				username
			});
		}

		const token = await createSession(user.id);
		setSessionCookie(cookies, token);
		throw redirect(303, '/');
	}
};
