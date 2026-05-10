<script>
	import ActivityCard from '$lib/components/activities/ActivityCard.svelte';
	import PlanActivityModal from '$lib/components/modals/PlanActivityModal.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';

	let { data } = $props();
	const wishlistActivities = $derived(data.activities);
	let selectedActivity = $state(null);
	let showPlanModal = $state(false);

	function openPlanModal(activity) {
		selectedActivity = activity;
		showPlanModal = true;
	}

	function closePlanModal() {
		showPlanModal = false;
		selectedActivity = null;
	}
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Wishlist</p>
			<h1>Gespeicherte Ideen</h1>
			<p class="muted">Sammle Aktivitäten, die du später planen oder mit anderen teilen möchtest.</p>
		</div>
		<a class="button" href="/categories">Weitere Ideen suchen</a>
	</div>

	{#if wishlistActivities.length}
		<div class="activity-grid">
			{#each wishlistActivities as activity}
				<div class="wishlist-card-shell">
					<ActivityCard {activity} wishlistIds={data.wishlistIds} />
					<div class="wishlist-card-actions">
						<button class="button" type="button" onclick={() => openPlanModal(activity)}>Planen</button>
						<a class="button ghost" href={`/activity/${activity.id}`}>Details ansehen</a>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<EmptyState
			title="Noch keine Ideen gespeichert"
			text="Füge Aktivitäten über das Herz zur Wishlist hinzu."
			actionHref="/"
			actionLabel="Inspiration öffnen"
		/>
	{/if}
</section>

<PlanActivityModal activity={selectedActivity} open={showPlanModal} onClose={closePlanModal} />
