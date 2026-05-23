import { getActivityById, getHistoryItems } from '$lib/server/repositories.js';

export async function load({ locals }) {
	const historyItems = await getHistoryItems(locals.user.id);
	const replacementActivity = historyItems.some((item) => item.activityId === 'minigolf-abend')
		? await getActivityById('escape-room')
		: null;

	return {
		historyItems: historyItems
			.map((item) =>
				item.activityId === 'minigolf-abend' && replacementActivity
					? {
							...item,
							activityId: 'escape-room',
							activity: replacementActivity
						}
					: item
			)
			.slice(0, 3)
	};
}
