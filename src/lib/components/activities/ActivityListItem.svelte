<script>
	import CategoryBadge from '$lib/components/ui/CategoryBadge.svelte';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import ActivityMeta from './ActivityMeta.svelte';
	let { activity } = $props();
</script>

<article class="activity-list-item card">
	<a href={`/activity/${activity.id}`}>
		<img src={activity.image} alt={activity.imageAlt ?? activity.title} />
	</a>
	<div>
		<div class="badge-row">
			{#each activity.categories.slice(0, 2) as category}
				<CategoryBadge label={category} />
			{/each}
		</div>
		<h3 style="margin-top: 10px;">{activity.title}</h3>
		<RatingStars rating={activity.rating} count={activity.reviewCount} />
		<ActivityMeta {activity} />
	</div>
	<a class="button secondary" href={`/activity/${activity.id}`}>Details</a>
</article>
