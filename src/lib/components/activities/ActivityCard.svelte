<script>
	import CategoryBadge from '$lib/components/ui/CategoryBadge.svelte';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import ActivityMeta from './ActivityMeta.svelte';
	import { isWishlisted, toggleWishlist } from '$lib/state/appState.svelte.js';

	let { activity } = $props();
</script>

<article class="activity-card card">
	<a class="activity-image-wrap" href={`/activity/${activity.id}`} aria-label={`${activity.title} oeffnen`}>
		<img src={activity.image} alt={activity.title} />
	</a>
	<button
		class={`wishlist-button ${isWishlisted(activity.id) ? 'wishlisted' : ''}`}
		type="button"
		aria-label="Wishlist umschalten"
		onclick={() => toggleWishlist(activity.id)}
	>
		{isWishlisted(activity.id) ? '♥' : '♡'}
	</button>
	<div class="activity-body">
		<div class="badge-row">
			{#each activity.categories.slice(0, 3) as category}
				<CategoryBadge label={category} />
			{/each}
		</div>
		<a href={`/activity/${activity.id}`}>
			<h3 style="margin-top: 14px;">{activity.title}</h3>
		</a>
		<RatingStars rating={activity.rating} count={activity.reviewCount} />
		<ActivityMeta {activity} />
	</div>
</article>
