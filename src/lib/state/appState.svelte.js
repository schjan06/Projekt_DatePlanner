import { browser } from '$app/environment';
import { plannedActivities as initialPlannedActivities } from '$lib/data/plannedActivities';

const defaultWishlist = ['sunset-picknick', 'keramik-workshop', 'street-food-tour', 'sternenhimmel'];

function readStored(key, fallback) {
	if (!browser) return fallback;

	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}

function persist() {
	if (!browser) return;
	localStorage.setItem('vibematch:wishlist', JSON.stringify(appState.wishlistIds));
	localStorage.setItem('vibematch:planned', JSON.stringify(appState.plannedActivities));
}

export const appState = $state({
	wishlistIds: readStored('vibematch:wishlist', defaultWishlist),
	plannedActivities: readStored('vibematch:planned', initialPlannedActivities),
	toast: ''
});

export function isWishlisted(id) {
	return appState.wishlistIds.includes(id);
}

export function toggleWishlist(id) {
	if (isWishlisted(id)) {
		appState.wishlistIds = appState.wishlistIds.filter((item) => item !== id);
		showToast('Aus Wishlist entfernt');
	} else {
		appState.wishlistIds = [...appState.wishlistIds, id];
		showToast('Zur Wishlist hinzugefuegt');
	}
	persist();
}

export function removeFromWishlist(id) {
	appState.wishlistIds = appState.wishlistIds.filter((item) => item !== id);
	showToast('Aus Wishlist entfernt');
	persist();
}

export function addPlannedActivity(activityId, details) {
	appState.plannedActivities = [
		...appState.plannedActivities,
		{
			id: `planned-${Date.now()}`,
			activityId,
			date: details.date,
			time: details.time,
			location: details.location,
			notes: details.notes
		}
	];
	showToast('Aktivitaet geplant');
	persist();
}

export function showToast(message) {
	appState.toast = message;
	if (browser) {
		window.setTimeout(() => {
			if (appState.toast === message) appState.toast = '';
		}, 2600);
	}
}
