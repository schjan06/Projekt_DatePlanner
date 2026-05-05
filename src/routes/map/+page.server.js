import { getActivities } from '$lib/server/repositories.js';

export async function load({ url }) {
	const search = url.searchParams.get('search') || '';
	return {
		activities: await getActivities({ search }),
		search
	};
}
