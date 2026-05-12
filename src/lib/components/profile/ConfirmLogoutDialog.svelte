<script>
	let { open = false, onClose = () => {}, onConfirm = async () => {} } = $props();
	let loggingOut = $state(false);

	$effect(() => {
		if (open) loggingOut = false;
	});

	async function confirm() {
		loggingOut = true;
		await onConfirm();
	}
</script>

{#if open}
	<div class="modal-backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-label="Ausloggen bestätigen">
			<div class="form-grid">
				<div class="review-modal-header">
					<div>
						<p class="eyebrow">Session</p>
						<h2>Ausloggen?</h2>
						<p class="muted">Deine aktuelle Session wird beendet und du wirst zur Login-Seite weitergeleitet.</p>
					</div>
					<button class="modal-close" type="button" aria-label="Dialog schliessen" onclick={onClose}>×</button>
				</div>

				<div class="action-row">
					<button class="button" type="button" disabled={loggingOut} onclick={confirm}>
						{loggingOut ? 'Ausloggen...' : 'Ausloggen'}
					</button>
					<button class="button secondary" type="button" onclick={onClose}>Abbrechen</button>
				</div>
			</div>
		</div>
	</div>
{/if}
