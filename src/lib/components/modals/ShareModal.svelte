<script>
	import { showToast } from '$lib/state/appState.svelte.js';

	let { activity, open = false, onClose = () => {} } = $props();
	let visibility = $state('Privat');
	let message = $state('');

	function share(event) {
		event.preventDefault();
		showToast('Teilen simuliert');
		message = '';
		visibility = 'Privat';
		onClose();
	}
</script>

{#if open && activity}
	<div class="modal-backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-label="Idee teilen">
			<form class="form-grid" onsubmit={share}>
				<div>
					<p class="eyebrow">Idee teilen</p>
					<h2>{activity.title}</h2>
					<p class="muted">Erstelle einen simulierten Share-Beitrag fuer den Prototyp.</p>
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
						<option>Oeffentlich</option>
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
