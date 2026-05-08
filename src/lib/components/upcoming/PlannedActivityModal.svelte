<script>
	let {
		open = false,
		item = null,
		onClose = () => {},
		onSaved = () => {},
		onDeleted = () => {}
	} = $props();

	let date = $state('');
	let time = $state('');
	let location = $state('');
	let notes = $state('');
	let saving = $state(false);
	let deleting = $state(false);
	let error = $state('');
	let fieldErrors = $state({});

	$effect(() => {
		if (open && item) {
			date = item.date || '';
			time = item.time || '';
			location = item.location || item.activity?.location || '';
			notes = item.notes || '';
			error = '';
			fieldErrors = {};
		}
	});

	async function save(event) {
		event.preventDefault();
		if (!item) return;
		saving = true;
		error = '';
		fieldErrors = {};

		const response = await fetch(`/api/planned/${item.id}`, {
			method: 'PATCH',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ date, time, location, notes })
		});
		const body = await response.json().catch(() => ({}));

		saving = false;
		if (response.ok) {
			await onSaved('Termin aktualisiert');
			onClose();
		} else {
			error = body.error || 'Termin konnte nicht gespeichert werden.';
			fieldErrors = body.fieldErrors || {};
		}
	}

	async function remove() {
		if (!item) return;
		deleting = true;
		error = '';

		const response = await fetch(`/api/planned/${item.id}`, { method: 'DELETE' });
		const body = await response.json().catch(() => ({}));

		deleting = false;
		if (response.ok) {
			await onDeleted('Termin entfernt');
			onClose();
		} else {
			error = body.error || 'Termin konnte nicht entfernt werden.';
		}
	}
</script>

{#if open && item}
	<div class="modal-backdrop" role="presentation">
		<button class="modal-backdrop-close" type="button" aria-label="Termin bearbeiten schliessen" onclick={onClose}></button>
		<form class="modal profile-modal planned-modal" onsubmit={save}>
			<div class="review-modal-header">
				<div>
					<p class="eyebrow">Termin bearbeiten</p>
					<h2>{item.activity.title}</h2>
					<p class="muted">{item.activity.city} · {item.activity.duration}</p>
				</div>
				<button class="modal-close" type="button" aria-label="Schliessen" onclick={onClose}>×</button>
			</div>

			<div class="form-grid">
				<div class="two-column equal">
					<label>
						Datum
						<input class="field" type="date" bind:value={date} />
						{#if fieldErrors.date}<span class="field-error">{fieldErrors.date}</span>{/if}
					</label>
					<label>
						Uhrzeit
						<input class="field" type="time" bind:value={time} />
						{#if fieldErrors.time}<span class="field-error">{fieldErrors.time}</span>{/if}
					</label>
				</div>
				<label>
					Ort / Treffpunkt
					<input class="field" bind:value={location} maxlength="120" placeholder="z.B. Drei Weieren, St. Gallen" />
					{#if fieldErrors.location}<span class="field-error">{fieldErrors.location}</span>{/if}
				</label>
				<label>
					Notiz
					<textarea rows="4" bind:value={notes} maxlength="300" placeholder="Was solltet ihr beachten?"></textarea>
					{#if fieldErrors.notes}<span class="field-error">{fieldErrors.notes}</span>{/if}
				</label>
			</div>

			{#if error}
				<p class="form-error">{error}</p>
			{/if}

			<div class="planned-modal-actions">
				<div class="action-row">
					<button class="button" type="submit" disabled={saving}>{saving ? 'Speichern...' : 'Speichern'}</button>
					<a class="button secondary" href={`/activity/${item.activity.id}`}>Details öffnen</a>
				</div>
				<button class="button danger" type="button" onclick={remove} disabled={deleting}>
					{deleting ? 'Entfernen...' : 'Aus Planung entfernen'}
				</button>
			</div>
		</form>
	</div>
{/if}
