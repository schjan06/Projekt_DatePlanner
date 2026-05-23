<script>
	let { open = false, onClose = () => {} } = $props();

	function handleKeydown(event) {
		if (open && event.key === 'Escape') onClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="modal-backdrop">
		<div class="modal profile-modal" role="dialog" aria-modal="true" aria-label="Reminder und Benachrichtigungen">
			<div class="form-grid">
				<div class="review-modal-header">
					<div>
						<p class="eyebrow">MVP-2-Abgrenzung</p>
						<h2>Reminder & Benachrichtigungen</h2>
						<p class="muted">Im aktuellen MVP werden Termine geplant und vergangene Aktivitäten dokumentiert. Automatische Erinnerungen sind bewusst nicht aktiv.</p>
					</div>
					<button class="modal-close" type="button" aria-label="Reminder und Benachrichtigungen schliessen" onclick={onClose}>×</button>
				</div>

				<div class="notification-concept-list">
					<article>
						<span>Aktueller MVP</span>
						<strong>Planung, Upcoming und History</strong>
						<p>Aktivitäten können geplant, im Kalender verschoben und nach der Durchführung als vergangene Aktivitäten bewertet oder mit einer Rückblicksnotiz ergänzt werden.</p>
					</article>
					<article>
						<span>Nicht umgesetzt</span>
						<strong>Keine automatischen Reminder</strong>
						<p>Es gibt aktuell keine Push-Mitteilungen, E-Mails, SMS, Kalenderexporte oder zeitgesteuerten Erinnerungen.</p>
					</article>
					<article>
						<span>MVP 2</span>
						<strong>Benachrichtigungskonzept</strong>
						<p>Für eine spätere Version sind Reminder-Zeitpunkte, auswählbare Kanäle und eine Kalenderintegration als mögliche Erweiterung vorgesehen.</p>
					</article>
				</div>

				<div class="action-row">
					<button class="button" type="button" onclick={onClose}>Verstanden</button>
				</div>
			</div>
		</div>
	</div>
{/if}
