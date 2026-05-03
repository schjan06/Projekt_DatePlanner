<script>
	import { page } from '$app/state';
	import { activities, getActivityById } from '$lib/data/activities';
	import { reviews } from '$lib/data/reviews';
	import CategoryBadge from '$lib/components/ui/CategoryBadge.svelte';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import ActivityGrid from '$lib/components/activities/ActivityGrid.svelte';
	import PlanActivityModal from '$lib/components/modals/PlanActivityModal.svelte';
	import ShareModal from '$lib/components/modals/ShareModal.svelte';
	import { isWishlisted, toggleWishlist } from '$lib/state/appState.svelte.js';

	const activity = $derived(getActivityById(page.params.id));
	const activityReviews = $derived(reviews.filter((review) => review.activityId === activity?.id));
	const similarActivities = $derived(
		activities
			.filter((item) => item.id !== activity?.id && item.categories.some((category) => activity?.categories.includes(category)))
			.slice(0, 3)
	);

	let showPlan = $state(false);
	let showShare = $state(false);
</script>

{#if activity}
	<section class="page">
		<div class="detail-hero">
			<img src={activity.image} alt={activity.title} />
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
					<button class="button" type="button" onclick={() => toggleWishlist(activity.id)}>
						{isWishlisted(activity.id) ? 'Aus Wishlist entfernen' : 'Zur Wishlist hinzufuegen'}
					</button>
					<button class="button secondary" type="button" onclick={() => (showPlan = true)}>Planen</button>
					<button class="button ghost" type="button" onclick={() => (showShare = true)}>Teilen</button>
				</div>
			</div>
		</div>

		<div class="detail-grid">
			<div>
				<div class="panel">
					<h2>Ueberblick</h2>
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
						<p class="muted">Noch keine Rezensionen. Im Prototyp koennen Bewertungen hier dargestellt werden.</p>
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
			<ActivityGrid activities={similarActivities} />
		</div>
	</section>

	<PlanActivityModal activity={activity} open={showPlan} onClose={() => (showPlan = false)} />
	<ShareModal activity={activity} open={showShare} onClose={() => (showShare = false)} />
{:else}
	<section class="page">
		<div class="empty-state panel">
			<h1>Aktivitaet nicht gefunden</h1>
			<p class="muted">Diese Idee existiert im Prototyp nicht.</p>
			<a class="button" href="/">Zurueck zur Inspiration</a>
		</div>
	</section>
{/if}
