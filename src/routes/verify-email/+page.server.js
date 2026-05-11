import { redirect } from '@sveltejs/kit';
import { verifyEmailToken } from '$lib/server/auth.js';

export async function load({ url }) {
	const token = url.searchParams.get('token') || '';
	try {
		await verifyEmailToken(token);
		throw redirect(303, '/login?verified=1');
	} catch (error) {
		if (error?.status === 303) throw error;
		return {
			error: error.message || 'Die E-Mail-Adresse konnte nicht bestätigt werden.'
		};
	}
}
