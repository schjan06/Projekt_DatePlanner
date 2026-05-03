<script>
	import { addPlannedActivity } from '$lib/state/appState.svelte.js';

	let { activity, open = false, onClose = () => {} } = $props();
	let date = $state('2026-05-30');
	let time = $state('18:30');
	let notes = $state('');

	function submit(event) {
		event.preventDefault();
		addPlannedActivity(activity.id, {
			date,
			time,
			location: `${activity.location}, ${activity.city}`,
			notes
		});
		onClose();
	}
</script>

{#if open && activity}
	<div class="modal-backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-label="Aktivitaet planen">
			<form class="form-grid" onsubmit={submit}>
				<div>
					<p class="eyebrow">Planen</p>
					<h2>{activity.title}</h2>
					<p class="muted">Lege Datum, Uhrzeit und eine kurze Notiz fuer euren Plan fest.</p>
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
					<textarea rows="3" bind:value={notes} placeholder="z.B. Tickets pruefen oder Treffpunkt festlegen"></textarea>
				</label>
				<div class="action-row">
					<button class="button" type="submit">Aktivitaet planen</button>
					<button class="button secondary" type="button" onclick={onClose}>Abbrechen</button>
				</div>
			</form>
		</div>
	</div>
{/if}
