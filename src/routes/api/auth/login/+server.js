import { json } from '@sveltejs/kit';
import { authenticateUser, createSession, setSessionCookie } from '$lib/server/auth.js';

export async function POST({ request, cookies }) {
	const { username = '', password = '' } = await request.json();
	let user = null;
	try {
		user = await authenticateUser(String(username).trim(), String(password));
	} catch (error) {
		return json({ error: error.message || 'Benutzername/E-Mail oder Passwort ist falsch.' }, { status: error.status || 400 });
	}

	if (!user) {
		return json({ error: 'Benutzername/E-Mail oder Passwort ist falsch.' }, { status: 400 });
	}

	const token = await createSession(user.id);
	setSessionCookie(cookies, token);
	return json({ user });
}
