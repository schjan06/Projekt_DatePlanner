<script>
	let { profile, open = false, onClose = () => {}, onSaved = async () => {} } = $props();

	let displayName = $state('');
	let username = $state('');
	let email = $state('');
	let location = $state('');
	let avatar = $state('');
	let bio = $state('');
	let preferredCity = $state('');
	let favoriteCategories = $state('');
	let error = $state('');
	let saving = $state(false);

	$effect(() => {
		if (open && profile) {
			displayName = profile.displayName || profile.name || '';
			username = profile.username || '';
			email = profile.email || '';
			location = profile.location || '';
			avatar = profile.avatar || '';
			bio = profile.bio || '';
			preferredCity = profile.preferences?.preferredCity || profile.location || '';
			favoriteCategories = (profile.preferences?.favoriteCategories || []).join(', ');
			error = '';
			saving = false;
		}
	});

	async function submit(event) {
		event.preventDefault();
		error = '';
		saving = true;

		const response = await fetch('/api/profile', {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				displayName,
				username,
				email,
				location,
				avatar,
				bio,
				preferredCity,
				favoriteCategories
			})
		});

		if (response.ok) {
			await onSaved('Profil gespeichert');
			onClose();
		} else {
			const body = await response.json().catch(() => ({}));
			error = body.error || 'Profil konnte nicht gespeichert werden.';
		}
		saving = false;
	}
</script>

{#if open}
	<div class="modal-backdrop">
		<div class="modal profile-modal" role="dialog" aria-modal="true" aria-label="Profil bearbeiten">
			<form class="form-grid" onsubmit={submit}>
				<div class="review-modal-header">
					<div>
						<p class="eyebrow">Profil</p>
						<h2>Profil bearbeiten</h2>
						<p class="muted">Passe deine Angaben an. Änderungen werden in MongoDB gespeichert.</p>
					</div>
					<button class="modal-close" type="button" aria-label="Profilformular schließen" onclick={onClose}>×</button>
				</div>

				<div class="two-column">
					<label>
						Anzeigename
						<input class="field" bind:value={displayName} />
					</label>
					<label>
						Benutzername
						<input class="field" bind:value={username} autocomplete="username" />
					</label>
				</div>

				<div class="two-column">
					<label>
						E-Mail
						<input class="field" type="email" bind:value={email} autocomplete="email" />
					</label>
					<label>
						Ort
						<input class="field" bind:value={location} />
					</label>
				</div>

				<div class="two-column">
					<label>
						Avatar oder Bild-URL
						<input class="field" bind:value={avatar} />
					</label>
					<label>
						Bevorzugte Stadt
						<input class="field" bind:value={preferredCity} />
					</label>
				</div>

				<label>
					Kurzbeschreibung
					<textarea rows="3" maxlength="240" bind:value={bio} placeholder="Was beschreibt dein VibeMatch-Profil?"></textarea>
				</label>

				<label>
					Lieblingskategorien
					<input class="field" bind:value={favoriteCategories} placeholder="z.B. Aktiv, Gesellig, Kreativ" />
				</label>

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
