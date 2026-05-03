import { json } from '@sveltejs/kit';
import { addWishlistItem, getWishlistActivities, getWishlistIds, removeWishlistItem } from '$lib/server/repositories.js';

export async function GET() {
	const [activities, wishlistIds] = await Promise.all([getWishlistActivities(), getWishlistIds()]);
	return json({ activities, wishlistIds });
}

export async function POST({ request }) {
	const { activityId } = await request.json();
	const wishlistIds = await addWishlistItem(activityId);
	return json({ wishlistIds }, { status: 201 });
}

export async function DELETE({ request }) {
	const { activityId } = await request.json();
	const wishlistIds = await removeWishlistItem(activityId);
	return json({ wishlistIds });
}
