import { getActivities, getCommunityPosts } from '$lib/server/repositories.js';

export async function load() {
	const [activities, communityPosts] = await Promise.all([getActivities(), getCommunityPosts()]);
	return { activities, communityPosts };
}
