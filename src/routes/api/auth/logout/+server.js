import { json } from '@sveltejs/kit';
import { clearSessionCookie, deleteSession, SESSION_COOKIE } from '$lib/server/auth.js';

export async function POST({ cookies }) {
	const token = cookies.get(SESSION_COOKIE);
	await deleteSession(token);
	clearSessionCookie(cookies);
	return json({ success: true });
}
