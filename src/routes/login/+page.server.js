import { fail, redirect } from '@sveltejs/kit';
import { authenticateUser, createSession, setSessionCookie } from '$lib/server/auth.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = String(formData.get('username') || '').trim();
		const password = String(formData.get('password') || '').trim();

		if (!username || !password) {
			return fail(400, {
				error: 'Bitte gib Benutzername oder E-Mail und Passwort ein.',
				username
			});
		}

		try {
			const user = await authenticateUser(username, password);
			if (!user) {
				return fail(400, {
					error: 'Benutzername/E-Mail oder Passwort ist falsch.',
					username
				});
			}

			const token = await createSession(user.id);
			setSessionCookie(cookies, token);
		} catch (error) {
			return fail(error.status || 400, {
				error: error.message || 'Benutzername/E-Mail oder Passwort ist falsch.',
				username
			});
		}

		throw redirect(303, '/');
	}
};
