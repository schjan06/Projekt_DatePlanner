<script>
	let { open = false, onClose = () => {}, onSent = async () => {} } = $props();

	let message = $state('');
	let error = $state('');
	let sending = $state(false);

	const faqs = [
		{ question: 'Was ist VibeMatch?', answer: 'VibeMatch hilft dir, gemeinsame Aktivitäten schneller zu finden, zu speichern und zu planen.' },
		{ question: 'Wie speichere ich eine Aktivität?', answer: 'Öffne eine Aktivität und klicke auf „Zur Wishlist hinzufügen“.' },
		{ question: 'Wie plane ich eine Aktivität?', answer: 'Auf der Detailseite kannst du über „Planen“ Datum, Uhrzeit und Notiz erfassen.' },
		{ question: 'Wie teile ich eine vergangene Aktivität?', answer: 'In der History kannst du vergangene Aktivitäten per Teilen-Dialog als Link, WhatsApp-Nachricht oder über die native Teilen-Funktion weitergeben.' },
		{ question: 'Wie funktionieren Bewertungen?', answer: 'Bewertungen werden auf der Detailseite als Rezension gespeichert und fliessen in die Aktivitätsbewertung ein.' }
	];

	$effect(() => {
		if (open) {
			message = '';
			error = '';
			sending = false;
		}
	});

	function handleKeydown(event) {
		if (open && event.key === 'Escape') onClose();
	}

	async function submit(event) {
		event.preventDefault();
		error = '';
		sending = true;

		const response = await fetch('/api/support', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ message })
		});

		if (response.ok) {
			await onSent('Feedback wurde im Prototyp gesendet');
			onClose();
		} else {
			const body = await response.json().catch(() => ({}));
			error = body.error || 'Feedback konnte nicht verarbeitet werden.';
		}
		sending = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="modal-backdrop">
		<div class="modal profile-modal" role="dialog" aria-modal="true" aria-label="Hilfe und Support">
			<form class="form-grid" onsubmit={submit}>
				<div class="review-modal-header">
					<div>
						<p class="eyebrow">Support</p>
						<h2>Hilfe & Support</h2>
						<p class="muted">Kurze Antworten für den Prototyp und ein simuliertes Feedbackformular.</p>
					</div>
					<button class="modal-close" type="button" aria-label="Hilfe schliessen" onclick={onClose}>×</button>
				</div>

				<div class="faq-list">
					{#each faqs as item}
						<article>
							<strong>{item.question}</strong>
							<p class="muted">{item.answer}</p>
						</article>
					{/each}
				</div>

				<label>
					Feedback
					<textarea rows="3" bind:value={message} placeholder="Was sollte VibeMatch noch besser machen?"></textarea>
				</label>

				{#if error}
					<p class="form-error">{error}</p>
				{/if}

				<div class="action-row">
					<button class="button" type="submit" disabled={sending}>{sending ? 'Senden...' : 'Feedback senden'}</button>
					<button class="button secondary" type="button" onclick={onClose}>Schliessen</button>
				</div>
			</form>
		</div>
	</div>
{/if}
