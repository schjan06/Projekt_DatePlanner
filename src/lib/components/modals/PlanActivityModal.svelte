<script>
	import { invalidateAll } from '$app/navigation';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { activity, open = false, onClose = () => {} } = $props();
	let date = $state('2026-05-30');
	let time = $state('18:30');
	let notes = $state('');

	function handleKeydown(event) {
		if (open && event.key === 'Escape') onClose();
	}

	async function submit(event) {
		event.preventDefault();
		const response = await fetch('/api/planned', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				activityId: activity.id,
				date,
				time,
				location: `${activity.location}, ${activity.city}`,
				notes
			})
		});

		const body = await response.json().catch(() => ({}));

		if (response.ok) {
			showToast('Aktivität geplant');
			await invalidateAll();
			onClose();
		} else {
			showToast(body.error || 'Aktivität konnte nicht geplant werden');
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open && activity}
	<div class="modal-backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-label="Aktivität planen">
			<form class="form-grid" onsubmit={submit}>
				<div>
					<p class="eyebrow">Planen</p>
					<h2>{activity.title}</h2>
					<p class="muted">Lege Datum, Uhrzeit und eine kurze Notiz für euren Plan fest.</p>
				</div>
				<label>
					Datum
					<input class="field" type="date" bind:value={date} />
				</label>
				<label>
					Uhrzeit
					<input class="field" type="time" bind:value={time} />
				</label>
				<label>
					Notiz
					<textarea rows="3" bind:value={notes} placeholder="z.B. Tickets prüfen oder Treffpunkt festlegen"></textarea>
				</label>
				<div class="action-row">
					<button class="button" type="submit">Aktivität planen</button>
					<button class="button secondary" type="button" onclick={onClose}>Abbrechen</button>
				</div>
			</form>
		</div>
	</div>
{/if}
