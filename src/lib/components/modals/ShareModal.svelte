<script>
	import { invalidateAll } from '$app/navigation';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { activity, open = false, onClose = () => {} } = $props();
	let visibility = $state('Privat');
	let message = $state('');

	async function share(event) {
		event.preventDefault();
		const response = await fetch('/api/community', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				activityId: activity.id,
				text: message,
				visibility
			})
		});

		if (response.ok) {
			showToast('Beitrag in der Community gespeichert');
			message = '';
			visibility = 'Privat';
			await invalidateAll();
			onClose();
		} else {
			showToast('Teilen konnte nicht gespeichert werden');
		}
	}
</script>

{#if open && activity}
	<div class="modal-backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-label="Idee teilen">
			<form class="form-grid" onsubmit={share}>
				<div>
					<p class="eyebrow">Idee teilen</p>
					<h2>{activity.title}</h2>
					<p class="muted">Erstelle einen Community-Beitrag und speichere ihn in MongoDB.</p>
				</div>
				<label>
				Nachricht
					<textarea rows="4" bind:value={message} placeholder="Warum passt diese Idee?"></textarea>
				</label>
				<label>
					Sichtbarkeit
					<select class="select" bind:value={visibility}>
						<option>Privat</option>
						<option>Nur mit Link</option>
						<option>Öffentlich</option>
					</select>
				</label>
				<div class="action-row">
					<button class="button" type="submit">Teilen</button>
					<button class="button secondary" type="button" onclick={onClose}>Abbrechen</button>
				</div>
			</form>
		</div>
	</div>
{/if}
