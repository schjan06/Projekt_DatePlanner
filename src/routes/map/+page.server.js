import { getActivities } from '$lib/server/repositories.js';
import { env } from '$env/dynamic/public';

export async function load({ url }) {
	const search = url.searchParams.get('search') || '';
	return {
		activities: await getActivities({ search }),
		search,
		mapsApiKey: env.PUBLIC_GOOGLE_MAPS_API_KEY || '',
		mapsMapId: env.PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID'
	};
}
