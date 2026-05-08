import { json } from '@sveltejs/kit';
import { addWishlistItem, getWishlistActivities, getWishlistIds, removeWishlistItem } from '$lib/server/repositories.js';

export async function GET({ locals }) {
	const [activities, wishlistIds] = await Promise.all([getWishlistActivities(locals.user.id), getWishlistIds(locals.user.id)]);
	return json({ activities, wishlistIds });
}

export async function POST({ request, locals }) {
	const { activityId } = await request.json();
	const wishlistIds = await addWishlistItem(activityId, locals.user.id);
	return json({ wishlistIds }, { status: 201 });
}

export async function DELETE({ request, locals }) {
	const { activityId } = await request.json();
	const wishlistIds = await removeWishlistItem(activityId, locals.user.id);
	return json({ wishlistIds });
}
