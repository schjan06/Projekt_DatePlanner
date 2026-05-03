import { browser } from '$app/environment';

export const appState = $state({
	toast: ''
});

export function showToast(message) {
	appState.toast = message;
	if (browser) {
		window.setTimeout(() => {
			if (appState.toast === message) appState.toast = '';
		}, 2600);
	}
}
