<script>
	import ActivityCard from '$lib/components/activities/ActivityCard.svelte';
	import PlanActivityModal from '$lib/components/modals/PlanActivityModal.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';

	let { data } = $props();
	let sortBy = $state('Zuletzt gespeichert');
	let selectedActivity = $state(null);
	let showPlanModal = $state(false);
	const wishlistActivities = $derived.by(() => {
		const order = new Map(data.wishlistIds.map((id, index) => [id, index]));
		const sorted = [...data.activities];
		if (sortBy === 'Stadt') return sorted.sort((a, b) => a.city.localeCompare(b.city, 'de-CH') || a.title.localeCompare(b.title, 'de-CH'));
		if (sortBy === 'Kategorie') {
			return sorted.sort(
				(a, b) =>
					(a.categories[0] || '').localeCompare(b.categories[0] || '', 'de-CH') || a.title.localeCompare(b.title, 'de-CH')
			);
		}
		if (sortBy === 'Preis') return sorted.sort((a, b) => a.priceLevel - b.priceLevel || a.title.localeCompare(b.title, 'de-CH'));
		return sorted.sort((a, b) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999));
	});

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
		<div class="wishlist-toolbar">
			<label>
				<span class="field-label">Sortieren</span>
				<select class="select" bind:value={sortBy}>
					<option>Zuletzt gespeichert</option>
					<option>Stadt</option>
					<option>Kategorie</option>
					<option>Preis</option>
				</select>
			</label>
			<a class="button" href="/categories">Weitere Ideen suchen</a>
		</div>
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
