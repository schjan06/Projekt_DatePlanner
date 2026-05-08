import { json } from '@sveltejs/kit';
import { authenticateUser, createSession, setSessionCookie } from '$lib/server/auth.js';

export async function POST({ request, cookies }) {
	const { username = '', password = '' } = await request.json();
	const user = await authenticateUser(String(username).trim().toLowerCase(), String(password));

	if (!user) {
		return json({ error: 'Benutzername oder Passwort ist falsch.' }, { status: 400 });
	}

	const token = await createSession(user.id);
	setSessionCookie(cookies, token);
	return json({ user });
}
