<script>
	import { activities } from '$lib/data/activities';
	import ActivityCard from '$lib/components/activities/ActivityCard.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import { appState } from '$lib/state/appState.svelte.js';

	const wishlistActivities = $derived(activities.filter((activity) => appState.wishlistIds.includes(activity.id)));
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Wishlist</p>
			<h1>Gespeicherte Ideen</h1>
			<p class="muted">Sammle Aktivitaeten, die du spaeter planen oder mit anderen teilen moechtest.</p>
		</div>
		<a class="button" href="/categories">Weitere Ideen suchen</a>
	</div>

	{#if wishlistActivities.length}
		<div class="panel" style="margin-bottom: 20px;">
			<strong>Tipp:</strong>
			<span class="muted"> Verschiebe Ideen ueber die Detailseite in kommende Aktivitaeten, sobald ihr sie plant.</span>
		</div>
		<div class="activity-grid">
			{#each wishlistActivities as activity}
				<ActivityCard {activity} />
			{/each}
		</div>
	{:else}
		<EmptyState
			title="Noch keine Ideen gespeichert"
			text="Fuege Aktivitaeten ueber das Herz zur Wishlist hinzu."
			actionHref="/"
			actionLabel="Inspiration oeffnen"
		/>
	{/if}
</section>
