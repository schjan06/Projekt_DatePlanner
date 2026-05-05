<script>
	import { invalidateAll } from '$app/navigation';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { activity, open = false, onClose = () => {} } = $props();
	let rating = $state(0);
	let hoverRating = $state(0);
	let comment = $state('');
	let visitWith = $state('Partner/in');
	let visitDate = $state('');
	let error = $state('');
	let submitting = $state(false);

	const companionOptions = ['Partner/in', 'Freunde', 'Familie', 'Gruppe'];
	const displayedRating = $derived(hoverRating || rating);

	function resetForm() {
		rating = 0;
		hoverRating = 0;
		comment = '';
		visitWith = 'Partner/in';
		visitDate = '';
		error = '';
		submitting = false;
	}

	function close() {
		resetForm();
		onClose();
	}

	async function submit(event) {
		event.preventDefault();
		error = '';

		if (!rating) {
			error = 'Bitte wähle eine Sternebewertung aus.';
			return;
		}

		if (comment.trim() && comment.trim().length < 10) {
			error = 'Wenn du eine Rezension schreibst, sollte sie mindestens 10 Zeichen lang sein.';
			return;
		}

		submitting = true;
		const response = await fetch('/api/reviews', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				activityId: activity.id,
				rating,
				comment,
				visitWith,
				visitDate
			})
		});

		if (response.ok) {
			showToast('Danke! Deine Bewertung wurde gespeichert.');
			await invalidateAll();
			close();
		} else {
			error = 'Bewertung konnte nicht gespeichert werden. Bitte versuche es erneut.';
			submitting = false;
		}
	}
</script>

{#if open && activity}
	<div class="modal-backdrop">
		<div class="modal review-modal" role="dialog" aria-modal="true" aria-label="Bewertung schreiben">
			<form class="form-grid" onsubmit={submit}>
				<div class="review-modal-header">
					<div>
						<p class="eyebrow">Rezension</p>
						<h2>Bewertung schreiben</h2>
						<p class="muted">{activity.title}</p>
					</div>
					<button class="modal-close" type="button" aria-label="Bewertung schließen" onclick={close}>×</button>
				</div>

				<div>
					<span class="field-label">Sternebewertung</span>
					<div class="review-stars" role="group" aria-label="Sternebewertung auswählen" onmouseleave={() => (hoverRating = 0)}>
						{#each [1, 2, 3, 4, 5] as value}
							<button
								class:active={displayedRating >= value}
								type="button"
								aria-label={`${value} von 5 Sternen auswählen`}
								onmouseenter={() => (hoverRating = value)}
								onclick={() => (rating = value)}
							>
								★
							</button>
						{/each}
					</div>
				</div>

				<div class="two-column review-form-row">
					<label>
						Mit wem warst du dort?
						<select class="select" bind:value={visitWith}>
							{#each companionOptions as option}
								<option>{option}</option>
							{/each}
						</select>
					</label>
					<label>
						Besuchsdatum
						<input class="field" type="date" bind:value={visitDate} />
					</label>
				</div>

				<label>
					Rezension
					<textarea rows="4" bind:value={comment} placeholder="Wie war eure Erfahrung?"></textarea>
				</label>

				{#if error}
					<p class="form-error">{error}</p>
				{/if}

				<div class="action-row">
					<button class="button" type="submit" disabled={submitting}>
						{submitting ? 'Speichern...' : 'Bewertung speichern'}
					</button>
					<button class="button secondary" type="button" onclick={close}>Abbrechen</button>
				</div>
			</form>
		</div>
	</div>
{/if}
