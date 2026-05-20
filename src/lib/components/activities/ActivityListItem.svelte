<script>
	import CategoryBadge from '$lib/components/ui/CategoryBadge.svelte';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import ActivityMeta from './ActivityMeta.svelte';
	let { activity } = $props();
</script>

<article class="activity-list-item card">
	<a class="activity-list-item-link" href={`/activity/${activity.id}`} aria-label={`${activity.title} öffnen`}>
		<span class="visually-hidden">{activity.title} öffnen</span>
	</a>
	<div class="activity-list-item-image">
		<img src={activity.image} alt={activity.imageAlt ?? activity.title} />
	</div>
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
	<a class="button secondary activity-list-item-action" href={`/activity/${activity.id}`}>Details</a>
</article>
