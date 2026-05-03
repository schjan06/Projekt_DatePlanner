<script>
	import ActivityCard from './ActivityCard.svelte';
	let { activities = [] } = $props();
</script>

<div class="activity-grid">
	{#each activities as activity}
		<ActivityCard {activity} />
	{/each}
</div>
