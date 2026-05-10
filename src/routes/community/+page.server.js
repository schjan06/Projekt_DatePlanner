import { getActivities, getCommunityPosts } from '$lib/server/repositories.js';

export async function load({ locals }) {
	const [activities, communityPosts] = await Promise.all([getActivities(), getCommunityPosts()]);
	return { activities, communityPosts, currentUserId: locals.user.id };
}
