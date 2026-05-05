<script>
	import LeafletActivityMap from '$lib/components/map/LeafletActivityMap.svelte';

	let { data } = $props();
	let search = $state('');
	let selected = $state(null);

	const query = $derived(search.trim().toLowerCase());
	const visibleActivities = $derived(
		data.activities
			.filter((activity) => Number.isFinite(activity.latitude) && Number.isFinite(activity.longitude))
			.filter((activity) => matchesPlace(activity, query))
	);
	const resultText = $derived.by(() => {
		const count = visibleActivities.length;
		if (!query) return `${count} Aktivitäten auf der Karte`;
		if (count === 0) return 'Keine Aktivitäten für diese Ortschaft gefunden';
		return `${count} Aktivitäten in/bei "${search.trim()}"`;
	});
	const emptyText = $derived(
		query
			? `Keine Aktivitäten für "${search.trim()}" gefunden. Suche nach einer Ortschaft wie Zürich, Winterthur oder St. Gallen.`
			: 'Keine Aktivitäten mit Koordinaten gefunden.'
	);

	function matchesPlace(activity, value) {
		if (!value) return true;
		return (activity.city ?? '').toLowerCase().includes(value) || (activity.location ?? '').toLowerCase().includes(value);
	}

	function handleSearchInput(event) {
		search = event.currentTarget.value;
		selected = null;
	}

	function submitSearch(event) {
		event.preventDefault();
	}
</script>

<section class="page map-page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Karte</p>
			<h1>Aktivitäten in deiner Nähe</h1>
			<p class="muted">OpenStreetMap-Karte mit VibeMatch-Markern, Suche und Detailvorschau.</p>
		</div>
		<form class="map-search" onsubmit={submitSearch}>
			<div class="action-row">
				<input
					class="search-input"
					style="max-width: 360px;"
					value={search}
					oninput={handleSearchInput}
					placeholder="Ortschaft suchen, z.B. Zürich"
				/>
				<button class="button" type="submit">Suchen</button>
			</div>
			<p class="map-search-meta">{resultText}</p>
		</form>
	</div>

	<div class="map-layout">
		<LeafletActivityMap
			activities={visibleActivities}
			{selected}
			{emptyText}
			onSelect={(activity) => (selected = activity)}
		/>
	</div>
</section>
