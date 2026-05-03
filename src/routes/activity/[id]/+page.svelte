<script>
	import CategoryBadge from '$lib/components/ui/CategoryBadge.svelte';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import ActivityGrid from '$lib/components/activities/ActivityGrid.svelte';
	import PlanActivityModal from '$lib/components/modals/PlanActivityModal.svelte';
	import ShareModal from '$lib/components/modals/ShareModal.svelte';
	import { invalidateAll } from '$app/navigation';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { data } = $props();
	const activity = $derived(data.activity);
	const activityReviews = $derived(data.reviews);
	const similarActivities = $derived(data.similarActivities);
	const wishlisted = $derived(data.wishlistIds.includes(activity.id));

	let showPlan = $state(false);
	let showShare = $state(false);
	let reviewName = $state('');
	let reviewRating = $state('5');
	let reviewComment = $state('');

	async function toggleWishlist() {
		const response = await fetch('/api/wishlist', {
			method: wishlisted ? 'DELETE' : 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ activityId: activity.id })
		});

		if (response.ok) {
			showToast(wishlisted ? 'Aus Wishlist entfernt' : 'Zur Wishlist hinzugefügt');
			await invalidateAll();
		} else {
			showToast('Wishlist konnte nicht aktualisiert werden');
		}
	}

	async function submitReview(event) {
		event.preventDefault();
		const response = await fetch('/api/reviews', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				activityId: activity.id,
				userName: reviewName,
				rating: Number(reviewRating),
				comment: reviewComment
			})
		});

		if (response.ok) {
			reviewName = '';
			reviewRating = '5';
			reviewComment = '';
			showToast('Bewertung gespeichert');
			await invalidateAll();
		} else {
			showToast('Bewertung konnte nicht gespeichert werden');
		}
	}
</script>

{#if activity}
	<section class="page">
		<div class="detail-hero">
			<img src={activity.image} alt={activity.imageAlt ?? activity.title} />
			<div class="detail-hero-content">
				<div class="badge-row">
					{#each activity.categories as category}
						<CategoryBadge label={category} />
					{/each}
				</div>
				<h1>{activity.title}</h1>
				<p>{activity.description}</p>
				<RatingStars rating={activity.rating} count={activity.reviewCount} />
				<div class="action-row" style="margin-top: 20px;">
					<button class="button" type="button" onclick={toggleWishlist}>
						{wishlisted ? 'Aus Wishlist entfernen' : 'Zur Wishlist hinzufügen'}
					</button>
					<button class="button secondary" type="button" onclick={() => (showPlan = true)}>Planen</button>
					<button class="button ghost" type="button" onclick={() => (showShare = true)}>Teilen</button>
				</div>
			</div>
		</div>

		<div class="detail-grid">
			<div>
				<div class="panel">
					<h2>Überblick</h2>
					<p>{activity.description}</p>
					<div class="info-grid">
						<div class="info-tile"><span class="muted">Preis</span><strong>{activity.priceText}</strong></div>
						<div class="info-tile"><span class="muted">Dauer</span><strong>{activity.duration}</strong></div>
						<div class="info-tile"><span class="muted">Ort</span><strong>{activity.city}</strong></div>
						<div class="info-tile"><span class="muted">Personen</span><strong>{activity.people}</strong></div>
					</div>
				</div>

				<div class="section panel">
					<h2>Tipps</h2>
					<div class="activity-list">
						{#each activity.tips as tip}
							<div class="info-tile">{tip}</div>
						{/each}
					</div>
				</div>

				<div class="section panel">
					<h2>Rezensionen</h2>
					<form class="form-grid" onsubmit={submitReview} style="margin-bottom: 20px;">
						<div class="two-column" style="grid-template-columns: 1fr 140px;">
							<label>
								Name
								<input class="field" bind:value={reviewName} placeholder="Dein Name" />
							</label>
							<label>
								Bewertung
								<select class="select" bind:value={reviewRating}>
									<option value="5">5</option>
									<option value="4.5">4.5</option>
									<option value="4">4</option>
									<option value="3.5">3.5</option>
									<option value="3">3</option>
								</select>
							</label>
						</div>
						<label>
							Kommentar
							<textarea rows="3" bind:value={reviewComment} placeholder="Wie war eure Erfahrung?"></textarea>
						</label>
						<button class="button" type="submit">Bewertung speichern</button>
					</form>
					{#if activityReviews.length}
						<div class="activity-list">
							{#each activityReviews as review}
								<article class="info-tile">
									<strong>{review.userName}</strong>
									<RatingStars rating={review.rating} />
									<p>{review.comment}</p>
									<span class="muted">{review.date}</span>
								</article>
							{/each}
						</div>
					{:else}
						<p class="muted">Noch keine Rezensionen. Bewertungen werden nach dem Speichern direkt aus MongoDB geladen.</p>
					{/if}
				</div>
			</div>

			<aside class="panel">
				<p class="eyebrow">Planungsinfos</p>
				<h2>{activity.location}</h2>
				<p class="muted">Beste Zeit: {activity.bestTime.join(', ')}</p>
				<h3>Was ihr braucht</h3>
				<div class="badge-row">
					{#each activity.requirements as requirement}
						<CategoryBadge label={requirement} />
					{/each}
				</div>
			</aside>
		</div>

		<div class="section">
			<div class="page-header">
				<div>
					<p class="eyebrow">Aehnliche Ideen</p>
					<h2>Passt vielleicht auch</h2>
				</div>
			</div>
			<ActivityGrid activities={similarActivities} wishlistIds={data.wishlistIds} />
		</div>
	</section>

	<PlanActivityModal activity={activity} open={showPlan} onClose={() => (showPlan = false)} />
	<ShareModal activity={activity} open={showShare} onClose={() => (showShare = false)} />
{:else}
	<section class="page">
		<div class="empty-state panel">
			<h1>Aktivität nicht gefunden</h1>
			<p class="muted">Diese Idee existiert im Prototyp nicht.</p>
			<a class="button" href="/">Zurück zur Inspiration</a>
		</div>
	</section>
{/if}
