import { json } from '@sveltejs/kit';
import { getProfile } from '$lib/server/repositories.js';

export async function GET() {
	return json({ profile: await getProfile() });
}
