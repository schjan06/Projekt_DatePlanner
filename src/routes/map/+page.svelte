<script>
	import { goto } from '$app/navigation';
	import ActivityListItem from '$lib/components/activities/ActivityListItem.svelte';
	import LeafletActivityMap from '$lib/components/map/LeafletActivityMap.svelte';

	let { data } = $props();
	let search = $state('');
	let selected = $state(null);
	const visibleActivities = $derived(data.activities.slice(0, 12));

	$effect(() => {
		search = data.search;
		selected = null;
	});

	function submitSearch(event) {
		event.preventDefault();
		const params = new URLSearchParams();
		if (search.trim()) params.set('search', search.trim());
		goto(`/map?${params.toString()}`, { keepFocus: true, noScroll: true });
	}
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Karte</p>
			<h1>Aktivitäten in deiner Nähe</h1>
			<p class="muted">OpenStreetMap-Karte mit VibeMatch-Markern, Suche und Detailvorschau.</p>
		</div>
		<form class="action-row" onsubmit={submitSearch}>
			<input class="search-input" style="max-width: 360px;" bind:value={search} placeholder="Ort oder Aktivität suchen" />
			<button class="button" type="submit">Suchen</button>
		</form>
	</div>

	<div class="map-layout">
		<LeafletActivityMap activities={visibleActivities} {selected} onSelect={(activity) => (selected = activity)} />
		<aside class="activity-list">
			{#each visibleActivities.slice(0, 5) as activity}
				<ActivityListItem {activity} />
			{/each}
		</aside>
	</div>
</section>
