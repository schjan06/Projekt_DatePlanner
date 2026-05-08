<script>
	let { profile, open = false, onClose = () => {}, onSent = async () => {} } = $props();

	let email = $state('');
	let copied = $state(false);
	let error = $state('');

	const inviteLink = $derived(`https://vibematch.local/invite/${profile?.userId || 'demo-user'}`);

	$effect(() => {
		if (open) {
			email = '';
			copied = false;
			error = '';
		}
	});

	async function copyLink() {
		error = '';
		try {
			if (typeof navigator !== 'undefined' && navigator.clipboard) {
				await navigator.clipboard.writeText(inviteLink);
			}
			copied = true;
			await onSent('Einladungslink kopiert');
		} catch {
			copied = true;
			await onSent('Einladungslink im Prototyp vorbereitet');
		}
	}

	async function simulateInvite(event) {
		event.preventDefault();
		if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Bitte gib eine gültige E-Mail-Adresse ein.';
			return;
		}
		await onSent(email.trim() ? 'Einladung wurde im Prototyp simuliert' : 'Einladungslink wurde vorbereitet');
		onClose();
	}
</script>

{#if open}
	<div class="modal-backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-label="Freunde einladen">
			<form class="form-grid" onsubmit={simulateInvite}>
				<div class="review-modal-header">
					<div>
						<p class="eyebrow">Einladen</p>
						<h2>Freunde einladen</h2>
						<p class="muted">Der Link ist eine Prototyp-Simulation. Es wird keine echte Einladung verschickt.</p>
					</div>
					<button class="modal-close" type="button" aria-label="Einladung schließen" onclick={onClose}>×</button>
				</div>

				<div class="invite-link-box">
					<span>{inviteLink}</span>
					<button class="button ghost" type="button" onclick={copyLink}>{copied ? 'Kopiert' : 'Link kopieren'}</button>
				</div>

				<label>
					E-Mail-Adresse optional
					<input class="field" type="email" bind:value={email} placeholder="name@example.com" />
				</label>

				{#if error}
					<p class="form-error">{error}</p>
				{/if}

				<div class="action-row">
					<button class="button" type="submit">Einladung simulieren</button>
					<button class="button secondary" type="button" onclick={onClose}>Abbrechen</button>
				</div>
			</form>
		</div>
	</div>
{/if}
