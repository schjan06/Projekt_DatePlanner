<script>
	import ActivityCard from './ActivityCard.svelte';
	let { activities = [], wishlistIds = [] } = $props();
</script>

<div class="activity-grid">
	{#each activities as activity}
		<ActivityCard {activity} {wishlistIds} />
	{/each}
</div>
