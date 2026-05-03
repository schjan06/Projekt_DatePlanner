<script>
	import { activities } from '$lib/data/activities';
	import ActivityListItem from '$lib/components/activities/ActivityListItem.svelte';
	import MapPreview from '$lib/components/map/MapPreview.svelte';

	let search = $state('');
	let selected = $state(activities[0]);
	const visibleActivities = $derived(
		activities
			.filter((activity) => {
				const query = search.trim().toLowerCase();
				return !query || activity.city.toLowerCase().includes(query) || activity.title.toLowerCase().includes(query);
			})
			.slice(0, 8)
	);
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Karte</p>
			<h1>Aktivitaeten in deiner Naehe</h1>
			<p class="muted">Simulierte Kartenansicht mit Pins, Vorschau und Detailnavigation.</p>
		</div>
		<input class="search-input" style="max-width: 360px;" bind:value={search} placeholder="Ort oder Aktivitaet suchen" />
	</div>

	<div class="map-layout">
		<MapPreview activities={visibleActivities} {selected} onSelect={(activity) => (selected = activity)} />
		<aside class="activity-list">
			{#each visibleActivities.slice(0, 5) as activity}
				<ActivityListItem {activity} />
			{/each}
		</aside>
	</div>
</section>
