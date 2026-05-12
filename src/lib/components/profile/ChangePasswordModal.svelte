<script>
	let { open = false, onClose = () => {}, onSaved = async () => {} } = $props();

	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let saving = $state(false);

	$effect(() => {
		if (open) {
			currentPassword = '';
			newPassword = '';
			confirmPassword = '';
			error = '';
			saving = false;
		}
	});

	async function submit(event) {
		event.preventDefault();
		error = '';
		saving = true;

		const response = await fetch('/api/profile/password', {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
		});

		if (response.ok) {
			await onSaved('Passwort geändert');
			onClose();
		} else {
			const body = await response.json().catch(() => ({}));
			error = body.error || 'Passwort konnte nicht geändert werden.';
		}
		saving = false;
	}
</script>

{#if open}
	<div class="modal-backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-label="Passwort ändern">
			<form class="form-grid" onsubmit={submit}>
				<div class="review-modal-header">
					<div>
						<p class="eyebrow">Sicherheit</p>
						<h2>Passwort ändern</h2>
						<p class="muted">Das neue Passwort wird gehasht gespeichert und nicht im Klartext abgelegt.</p>
					</div>
					<button class="modal-close" type="button" aria-label="Passwortformular schliessen" onclick={onClose}>×</button>
				</div>

				<label>
					Aktuelles Passwort
					<input class="field" type="password" bind:value={currentPassword} autocomplete="current-password" />
				</label>
				<label>
					Neues Passwort
					<input class="field" type="password" bind:value={newPassword} autocomplete="new-password" />
				</label>
				<label>
					Neues Passwort bestätigen
					<input class="field" type="password" bind:value={confirmPassword} autocomplete="new-password" />
				</label>

				{#if error}
					<p class="form-error">{error}</p>
				{/if}

				<div class="action-row">
					<button class="button" type="submit" disabled={saving}>{saving ? 'Speichern...' : 'Passwort speichern'}</button>
					<button class="button secondary" type="button" onclick={onClose}>Abbrechen</button>
				</div>
			</form>
		</div>
	</div>
{/if}
