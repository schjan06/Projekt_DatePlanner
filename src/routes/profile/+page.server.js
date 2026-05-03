import { getProfile } from '$lib/server/repositories.js';

export async function load() {
	return { profile: await getProfile() };
}
