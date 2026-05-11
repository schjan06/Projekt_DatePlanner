import { json, redirect } from '@sveltejs/kit';
import { getUserBySessionToken, SESSION_COOKIE } from '$lib/server/auth.js';

const PUBLIC_PATHS = ['/login'];
const PUBLIC_API_PATHS = ['/api/auth/login'];

function isAssetPath(pathname) {
	return pathname.startsWith('/_app/') || pathname === '/robots.txt' || pathname === '/favicon.ico';
}

function isPublicPath(pathname) {
	return PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function isPublicApiPath(pathname) {
	return PUBLIC_API_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export async function handle({ event, resolve }) {
	const pathname = event.url.pathname;
	if (isAssetPath(pathname)) return resolve(event);

	const token = event.cookies.get(SESSION_COOKIE);
	event.locals.user = await getUserBySessionToken(token);

	if (event.locals.user && pathname === '/login') {
		throw redirect(303, '/');
	}

	if (!event.locals.user && pathname.startsWith('/api/') && !isPublicApiPath(pathname)) {
		return json({ error: 'Bitte melde dich zuerst an.' }, { status: 401 });
	}

	if (!event.locals.user && !pathname.startsWith('/api/') && !isPublicPath(pathname)) {
		throw redirect(303, '/login');
	}

	return resolve(event);
}
