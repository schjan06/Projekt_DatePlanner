import { getProfile } from '$lib/server/repositories.js';

export async function load({ locals }) {
	return { profile: await getProfile(locals.user.id) };
}
