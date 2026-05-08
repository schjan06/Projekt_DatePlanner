<script>
	import RatingStars from '$lib/components/ui/RatingStars.svelte';

	let { reviews = [] } = $props();

	const totalReviews = $derived(reviews.length);
	const average = $derived(
		totalReviews
			? Math.round((reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / totalReviews) * 10) / 10
			: 0
	);
	const distribution = $derived(
		[5, 4, 3, 2, 1].map((stars) => {
			const count = reviews.filter((review) => Math.min(5, Math.max(1, Math.round(Number(review.rating || 0)))) === stars).length;
			return {
				stars,
				count,
				percent: totalReviews ? Math.round((count / totalReviews) * 100) : 0
			};
		})
	);
</script>

<section class="review-summary">
	{#if totalReviews}
		<div class="review-summary-score">
			<span class="review-summary-average">{average.toFixed(1)}</span>
			<RatingStars rating={average} count={totalReviews} />
			<p class="muted">Basierend auf {totalReviews} {totalReviews === 1 ? 'Bewertung' : 'Bewertungen'}.</p>
		</div>
		<div class="review-distribution" aria-label="Bewertungsverteilung">
			{#each distribution as row}
				<div class="review-distribution-row">
					<span>{row.stars} Sterne</span>
					<div class="review-bar" aria-hidden="true">
						<span style={`width: ${row.percent}%`}></span>
					</div>
					<strong>{row.count}</strong>
				</div>
			{/each}
		</div>
	{:else}
		<div class="review-summary-empty">
			<h3>Noch keine Bewertungen</h3>
			<p class="muted">Sobald eine Bewertung gespeichert wird, erscheinen hier Durchschnitt und Verteilung.</p>
		</div>
	{/if}
</section>
