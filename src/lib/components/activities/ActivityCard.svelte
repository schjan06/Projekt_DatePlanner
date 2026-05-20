<script>
	import CategoryBadge from '$lib/components/ui/CategoryBadge.svelte';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import ActivityMeta from './ActivityMeta.svelte';
	import { invalidateAll } from '$app/navigation';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { activity, wishlistIds = [] } = $props();
	const wishlisted = $derived(wishlistIds.includes(activity.id));

	async function toggleWishlist(event) {
		event.preventDefault();
		event.stopPropagation();

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

<article class="activity-card card">
	<a class="activity-card-link" href={`/activity/${activity.id}`} aria-label={`${activity.title} öffnen`}>
		<span class="visually-hidden">{activity.title} öffnen</span>
	</a>
	<div class="activity-image-wrap">
		<img src={activity.image} alt={activity.imageAlt ?? activity.title} />
	</div>
	<button
		class={`wishlist-button ${wishlisted ? 'wishlisted' : ''}`}
		type="button"
		aria-label="Wishlist umschalten"
		onclick={toggleWishlist}
	>
		{wishlisted ? '♥' : '♡'}
	</button>
	<div class="activity-body">
		<div class="badge-row">
			{#each activity.categories.slice(0, 3) as category}
				<CategoryBadge label={category} />
			{/each}
		</div>
		<h3 style="margin-top: 14px;">{activity.title}</h3>
		<RatingStars rating={activity.rating} count={activity.reviewCount} />
		<ActivityMeta {activity} />
	</div>
</article>
