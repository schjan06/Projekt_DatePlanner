<script>
	let { profile, open = false, onClose = () => {}, onSaved = async () => {} } = $props();

	let plannedActivityReminders = $state(true);
	let wishlistUpdates = $state(false);
	let communityUpdates = $state(true);
	let emailNotifications = $state(false);
	let pushNotifications = $state(false);
	let error = $state('');
	let saving = $state(false);

	$effect(() => {
		if (open) {
			const settings = profile?.preferences?.notificationSettings || {};
			plannedActivityReminders = settings.plannedActivityReminders ?? true;
			wishlistUpdates = settings.wishlistUpdates ?? false;
			communityUpdates = settings.communityUpdates ?? true;
			emailNotifications = settings.emailNotifications ?? false;
			pushNotifications = settings.pushNotifications ?? false;
			error = '';
			saving = false;
		}
	});

	function handleKeydown(event) {
		if (open && event.key === 'Escape') onClose();
	}

	async function submit(event) {
		event.preventDefault();
		error = '';
		saving = true;

		const response = await fetch('/api/profile/notifications', {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				plannedActivityReminders,
				wishlistUpdates,
				communityUpdates,
				emailNotifications,
				pushNotifications
			})
		});

		if (response.ok) {
			await onSaved('Benachrichtigungen gespeichert');
			onClose();
		} else {
			const body = await response.json().catch(() => ({}));
			error = body.error || 'Benachrichtigungen konnten nicht gespeichert werden.';
		}
		saving = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="modal-backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-label="Benachrichtigungen">
			<form class="form-grid" onsubmit={submit}>
				<div class="review-modal-header">
					<div>
						<p class="eyebrow">Einstellungen</p>
						<h2>Benachrichtigungen</h2>
						<p class="muted">Diese Einstellungen werden gespeichert. Echte Benachrichtigungen werden im Prototyp nicht versendet.</p>
					</div>
					<button class="modal-close" type="button" aria-label="Benachrichtigungen schliessen" onclick={onClose}>×</button>
				</div>

				<div class="settings-toggle-list">
					<label><input type="checkbox" bind:checked={plannedActivityReminders} /> Erinnerungen für geplante Aktivitäten</label>
					<label><input type="checkbox" bind:checked={wishlistUpdates} /> Updates zu gespeicherten Ideen</label>
					<label><input type="checkbox" bind:checked={communityUpdates} /> Community-Benachrichtigungen</label>
					<label><input type="checkbox" bind:checked={emailNotifications} /> E-Mail-Benachrichtigungen</label>
					<label><input type="checkbox" bind:checked={pushNotifications} /> Push-Benachrichtigungen</label>
				</div>

				{#if error}
					<p class="form-error">{error}</p>
				{/if}

				<div class="action-row">
					<button class="button" type="submit" disabled={saving}>{saving ? 'Speichern...' : 'Speichern'}</button>
					<button class="button secondary" type="button" onclick={onClose}>Abbrechen</button>
				</div>
			</form>
		</div>
	</div>
{/if}
