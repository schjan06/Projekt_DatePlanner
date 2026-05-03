<script>
	import ActivityCard from '$lib/components/activities/ActivityCard.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';

	let { data } = $props();
	const wishlistActivities = $derived(data.activities);
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
		<div class="panel" style="margin-bottom: 20px;">
			<strong>Tipp:</strong>
			<span class="muted"> Verschiebe Ideen über die Detailseite in kommende Aktivitäten, sobald ihr sie plant.</span>
		</div>
		<div class="activity-grid">
			{#each wishlistActivities as activity}
				<ActivityCard {activity} wishlistIds={data.wishlistIds} />
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
