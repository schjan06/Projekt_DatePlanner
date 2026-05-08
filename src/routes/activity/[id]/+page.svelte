<script>
	import CategoryBadge from '$lib/components/ui/CategoryBadge.svelte';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import ActivityGrid from '$lib/components/activities/ActivityGrid.svelte';
	import ActivityGallery from '$lib/components/activities/ActivityGallery.svelte';
	import PlanActivityModal from '$lib/components/modals/PlanActivityModal.svelte';
	import ShareModal from '$lib/components/modals/ShareModal.svelte';
	import ReviewModal from '$lib/components/modals/ReviewModal.svelte';
	import ReviewSummary from '$lib/components/reviews/ReviewSummary.svelte';
	import { invalidateAll } from '$app/navigation';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { data } = $props();
	const activity = $derived(data.activity);
	const activityReviews = $derived(data.reviews);
	const similarActivities = $derived(data.similarActivities);
	const wishlisted = $derived(data.wishlistIds.includes(activity.id));
	const heroGallery = $derived(activity.gallery?.length ? activity.gallery : [{ src: activity.image, alt: activity.imageAlt ?? activity.title }]);
	const tips = $derived(activity.tips ?? []);
	const requirements = $derived(activity.requirements ?? []);
	const bestTime = $derived(activity.bestTime ?? []);

	let showPlan = $state(false);
	let showShare = $state(false);
	let showReviewModal = $state(false);

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

</script>

{#if activity}
	<section class="page">
		<ActivityGallery gallery={heroGallery} title={activity.title} variant="hero">
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
		</ActivityGallery>

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
					{#if tips.length}
						<div class="activity-list">
							{#each tips as tip}
								<div class="info-tile">{tip}</div>
							{/each}
						</div>
					{:else}
						<p class="muted">Noch keine Tipps hinterlegt.</p>
					{/if}
				</div>

				<div class="section panel">
					<div class="section-header">
						<div>
							<h2>Rezensionen</h2>
							<p class="muted">Teile deine Erfahrung direkt im Kontext dieser Aktivität.</p>
						</div>
						<button class="button" type="button" onclick={() => (showReviewModal = true)}>Bewertung schreiben</button>
					</div>
					<ReviewSummary reviews={activityReviews} />
					{#if activityReviews.length}
						<div class="activity-list">
							{#each activityReviews as review}
								<article class="info-tile">
									<strong>{review.userName}</strong>
									<RatingStars rating={review.rating} />
									<p>{review.comment}</p>
									{#if review.visitWith || review.visitDate}
										<div class="meta-row">
											{#if review.visitWith}
												<span>{review.visitWith}</span>
											{/if}
											{#if review.visitDate}
												<span>{review.visitDate}</span>
											{/if}
										</div>
									{/if}
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
				<p class="muted">Beste Zeit: {bestTime.length ? bestTime.join(', ') : 'Flexibel'}</p>
				<h3>Was ihr braucht</h3>
				{#if requirements.length}
					<div class="badge-row">
						{#each requirements as requirement}
							<CategoryBadge label={requirement} />
						{/each}
					</div>
				{:else}
					<p class="muted">Keine besonderen Anforderungen.</p>
				{/if}
			</aside>
		</div>

		<div class="section">
			<div class="page-header">
				<div>
					<p class="eyebrow">Ähnliche Ideen</p>
					<h2>Passt vielleicht auch</h2>
				</div>
			</div>
			<ActivityGrid activities={similarActivities} wishlistIds={data.wishlistIds} />
		</div>
	</section>

	<PlanActivityModal activity={activity} open={showPlan} onClose={() => (showPlan = false)} />
	<ShareModal activity={activity} open={showShare} onClose={() => (showShare = false)} />
	<ReviewModal activity={activity} open={showReviewModal} onClose={() => (showReviewModal = false)} />
{:else}
	<section class="page">
		<div class="empty-state panel">
			<h1>Aktivität nicht gefunden</h1>
			<p class="muted">Diese Idee existiert im Prototyp nicht.</p>
			<a class="button" href="/">Zurück zur Inspiration</a>
		</div>
	</section>
{/if}
