import { json } from '@sveltejs/kit';
import { addWishlistItem, getWishlistActivities, getWishlistIds, removeWishlistItem } from '$lib/server/repositories.js';
import { jsonError, readJson } from '$lib/server/apiErrors.js';

export async function GET({ locals }) {
	const [activities, wishlistIds] = await Promise.all([getWishlistActivities(locals.user.id), getWishlistIds(locals.user.id)]);
	return json({ activities, wishlistIds });
}

export async function POST({ request, locals }) {
	try {
		const { activityId } = await readJson(request);
		const wishlistIds = await addWishlistItem(activityId, locals.user.id);
		return json({ wishlistIds }, { status: 201 });
	} catch (issue) {
		return jsonError(issue, 'Aktivitaet konnte nicht gespeichert werden.');
	}
}

export async function DELETE({ request, locals }) {
	try {
		const { activityId } = await readJson(request);
		const wishlistIds = await removeWishlistItem(activityId, locals.user.id);
		return json({ wishlistIds });
	} catch (issue) {
		return jsonError(issue, 'Aktivitaet konnte nicht aus der Wishlist entfernt werden.');
	}
}
