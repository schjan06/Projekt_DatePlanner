<script>
	import { invalidateAll } from '$app/navigation';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import ShareModal from '$lib/components/modals/ShareModal.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { data } = $props();
	let selectedActivity = $state(null);
	let editingItem = $state(null);
	let editRating = $state(0);
	let editMemory = $state('');
	let editFavorite = $state(false);
	let saving = $state(false);
	let error = $state('');
	let fieldErrors = $state({});

	function openEditor(item) {
		editingItem = item;
		editRating = Number(item.rating || 0);
		editMemory = item.memory || '';
		editFavorite = Boolean(item.favorite);
		error = '';
		fieldErrors = {};
	}

	function closeEditor() {
		editingItem = null;
		error = '';
		fieldErrors = {};
	}

	function handleKeydown(event) {
		if (editingItem && event.key === 'Escape') closeEditor();
	}

	async function saveHistory(event) {
		event.preventDefault();
		if (!editingItem) return;
		saving = true;
		error = '';
		fieldErrors = {};

		const response = await fetch(`/api/history/${editingItem.id}`, {
			method: 'PATCH',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				rating: editRating,
				memory: editMemory,
				favorite: editFavorite
			})
		});
		const body = await response.json().catch(() => ({}));
		saving = false;

		if (response.ok) {
			showToast('Erinnerung gespeichert');
			await invalidateAll();
			closeEditor();
		} else {
			error = body.error || 'Erinnerung konnte nicht gespeichert werden.';
			fieldErrors = body.fieldErrors || {};
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Vergangene Aktivitäten</p>
			<h1>Erinnerungen</h1>
			<p class="muted">Bewertungen, Favoriten und kleine Rückblicke auf bereits gemachte Erlebnisse.</p>
		</div>
	</div>

	{#if data.historyItems.length}
		<div class="memory-grid activity-grid">
			{#each data.historyItems as item}
				{@const activity = item.activity}
				{#if activity}
					<article class="card activity-card">
						<a class="activity-image-wrap" href={`/activity/${activity.id}`}>
							<img src={activity.image} alt={activity.imageAlt ?? activity.title} />
						</a>
						<div class="activity-body">
							<p class="eyebrow">{item.date}{item.favorite ? ' · Favorit' : ''}</p>
							<h3>{activity.title}</h3>
							{#if Number(item.rating) > 0}
								<RatingStars rating={item.rating} />
							{:else}
								<p class="muted">Noch nicht bewertet</p>
							{/if}
							<p class="muted">{item.memory}</p>
							<div class="action-row">
								<a class="button secondary" href={`/activity/${activity.id}`}>Details</a>
								<button class="button ghost" type="button" onclick={() => openEditor(item)}>
									Bearbeiten
								</button>
								<button class="button ghost" type="button" onclick={() => (selectedActivity = activity)}>
									Erinnerung teilen
								</button>
							</div>
						</div>
					</article>
				{/if}
			{/each}
		</div>
	{:else}
		<EmptyState
			title="Noch keine Erinnerungen"
			text="Markiere geplante Aktivitäten als erledigt, damit sie hier erscheinen."
			actionHref="/upcoming"
			actionLabel="Planung öffnen"
		/>
	{/if}
</section>

<ShareModal activity={selectedActivity} open={Boolean(selectedActivity)} onClose={() => (selectedActivity = null)} />

{#if editingItem}
	<div class="modal-backdrop" role="presentation">
		<button class="modal-backdrop-close" type="button" aria-label="Erinnerung bearbeiten schliessen" onclick={closeEditor}></button>
		<form class="modal profile-modal history-edit-modal" onsubmit={saveHistory}>
			<div class="review-modal-header">
				<div>
					<p class="eyebrow">Erinnerung</p>
					<h2>{editingItem.activity.title}</h2>
					<p class="muted">Bewertung, Notiz und Favorit bearbeiten.</p>
				</div>
				<button class="modal-close" type="button" aria-label="Schliessen" onclick={closeEditor}>×</button>
			</div>

			<div class="form-grid">
				<div>
					<span class="field-label">Bewertung</span>
					<div class="review-rating-control history-rating-control">
						{#each [1, 2, 3, 4, 5] as value}
							<button
								type="button"
								class:active={editRating >= value}
								aria-pressed={editRating === value}
								aria-label={`${value} von 5 Sternen`}
								onclick={() => (editRating = value)}
							>
								★
							</button>
						{/each}
					</div>
					<button class="button ghost tiny-action" type="button" onclick={() => (editRating = 0)}>Bewertung entfernen</button>
					{#if fieldErrors.rating}<span class="field-error">{fieldErrors.rating}</span>{/if}
				</div>

				<label>
					Erinnerung
					<textarea rows="4" bind:value={editMemory} maxlength="400" placeholder="Was bleibt euch in Erinnerung?"></textarea>
					{#if fieldErrors.memory}<span class="field-error">{fieldErrors.memory}</span>{/if}
				</label>

				<label class="checkbox-row">
					<input type="checkbox" bind:checked={editFavorite} />
					<span>Als Favorit markieren</span>
				</label>
			</div>

			{#if error}
				<p class="form-error">{error}</p>
			{/if}

			<div class="action-row">
				<button class="button" type="submit" disabled={saving}>{saving ? 'Speichern...' : 'Speichern'}</button>
				<button class="button secondary" type="button" onclick={closeEditor}>Abbrechen</button>
			</div>
		</form>
	</div>
{/if}
