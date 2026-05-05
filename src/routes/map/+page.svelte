<script>
	import CategoryBadge from '$lib/components/ui/CategoryBadge.svelte';
	import LeafletActivityMap from '$lib/components/map/LeafletActivityMap.svelte';

	let { data } = $props();
	let searchLocation = $state('');
	let selectedActivity = $state(null);
	let mapBounds = $state(null);
	let locationMessage = $state('');
	let focusTarget = $state(null);

	const knownLocations = [
		{ label: 'Zürich', aliases: ['zuerich', 'zurich'], latitude: 47.3769, longitude: 8.5417, zoom: 12 },
		{ label: 'Winterthur', aliases: [], latitude: 47.4988, longitude: 8.7237, zoom: 13 },
		{ label: 'St. Gallen', aliases: ['st gallen', 'sankt gallen'], latitude: 47.4245, longitude: 9.3767, zoom: 13 },
		{ label: 'Luzern', aliases: ['lucerne'], latitude: 47.0502, longitude: 8.3093, zoom: 13 },
		{ label: 'Rapperswil', aliases: ['rapperswil-jona'], latitude: 47.2267, longitude: 8.8187, zoom: 13 },
		{ label: 'Appenzell', aliases: ['saentis', 'säntis'], latitude: 47.331, longitude: 9.409, zoom: 12 }
	];

	const coordinateActivities = $derived(
		data.activities.filter((activity) => Number.isFinite(activity.latitude) && Number.isFinite(activity.longitude))
	);
	const activitiesInBounds = $derived(coordinateActivities.filter((activity) => isInBounds(activity, mapBounds)));
	const resultText = $derived.by(() => {
		const count = activitiesInBounds.length;
		if (count === 0) return 'Keine Aktivitäten in diesem Kartenausschnitt';
		if (searchLocation.trim()) return `${count} Aktivitäten im sichtbaren Ausschnitt`;
		return `${count} Aktivitäten auf der Karte`;
	});
	const emptyText = $derived(
		searchLocation.trim()
			? `Keine Aktivitäten für "${searchLocation.trim()}" gefunden. Suche nach einer Ortschaft wie Zürich, Winterthur oder St. Gallen.`
			: 'Keine Aktivitäten in diesem Kartenausschnitt gefunden.'
	);

	function normalizeLocation(value) {
		return value
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/\./g, '')
			.replace(/\s+/g, ' ')
			.trim();
	}

	function findKnownLocation(value) {
		const normalized = normalizeLocation(value);
		return knownLocations.find((location) => {
			const names = [location.label, ...location.aliases].map(normalizeLocation);
			return names.includes(normalized);
		});
	}

	function isInBounds(activity, bounds) {
		if (!bounds) return true;
		return (
			activity.latitude <= bounds.north &&
			activity.latitude >= bounds.south &&
			activity.longitude <= bounds.east &&
			activity.longitude >= bounds.west
		);
	}

	function setFocusTarget(target) {
		focusTarget = { ...target, id: `${target.type}-${target.label ?? target.activityId ?? Date.now()}-${Date.now()}` };
	}

	function showOverview() {
		searchLocation = '';
		locationMessage = '';
		selectedActivity = null;
		setFocusTarget({ type: 'overview' });
	}

	function applyLocationSearch(value) {
		const trimmed = value.trim();
		if (!trimmed) {
			showOverview();
			return;
		}

		const location = findKnownLocation(trimmed);
		if (!location) {
			locationMessage = 'Diese Ortschaft ist im Prototyp noch nicht hinterlegt.';
			return;
		}

		locationMessage = '';
		selectedActivity = null;
		setFocusTarget({ type: 'location', label: location.label, latitude: location.latitude, longitude: location.longitude, zoom: location.zoom });
	}

	function handleSearchInput(event) {
		searchLocation = event.currentTarget.value;
		applyLocationSearch(searchLocation);
	}

	function submitSearch(event) {
		event.preventDefault();
		applyLocationSearch(searchLocation);
	}

	function selectActivity(activity) {
		selectedActivity = activity;
		setFocusTarget({
			type: 'activity',
			activityId: activity.id,
			latitude: activity.latitude,
			longitude: activity.longitude,
			zoom: 15
		});
	}

	function handleMarkerSelect(activity) {
		selectedActivity = activity;
	}

	function handleBoundsChange(bounds) {
		mapBounds = bounds;
	}
</script>

<section class="page map-page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Karte</p>
			<h1>Aktivitäten in deiner Nähe</h1>
			<p class="muted">OpenStreetMap-Karte mit VibeMatch-Markern, Suche und Detailvorschau.</p>
		</div>
	</div>

	<div class="map-layout">
		<LeafletActivityMap
			activities={coordinateActivities}
			selected={selectedActivity}
			{focusTarget}
			{emptyText}
			onSelect={handleMarkerSelect}
			onBoundsChange={handleBoundsChange}
		/>

		<aside class="map-search-panel card" aria-label="Aktivitäten nach Ortschaft suchen">
			<form class="map-search" onsubmit={submitSearch}>
				<label class="field-label" for="map-place-search">Ortschaft</label>
				<div class="action-row">
					<input
						id="map-place-search"
						class="search-input"
						value={searchLocation}
						oninput={handleSearchInput}
						placeholder="Zürich, Winterthur, St. Gallen"
					/>
					<button class="button" type="submit">Suchen</button>
				</div>
				<p class="map-search-meta">{resultText}</p>
				{#if locationMessage}
					<p class="map-location-message">{locationMessage}</p>
				{/if}
			</form>

			<div class="map-location-chips" aria-label="Beliebte Orte">
				{#each knownLocations as location}
					<button type="button" onclick={() => {
						searchLocation = location.label;
						applyLocationSearch(location.label);
					}}>{location.label}</button>
				{/each}
			</div>

			<div class="map-result-list" aria-live="polite">
				{#if activitiesInBounds.length === 0}
					<div class="map-panel-empty">
						<h2>Keine Aktivitäten</h2>
						<p class="muted">Keine Aktivitäten in diesem Kartenausschnitt gefunden.</p>
						<button class="button secondary" type="button" onclick={showOverview}>Alle Aktivitäten anzeigen</button>
					</div>
				{:else}
					{#each activitiesInBounds as activity}
						<button
							class:selected={selectedActivity?.id === activity.id}
							class="map-result-card"
							type="button"
							onclick={() => selectActivity(activity)}
						>
							<img src={activity.image} alt={activity.imageAlt ?? activity.title} />
							<span class="map-result-content">
								<span class="map-result-title">{activity.title}</span>
								<span class="map-result-meta">{activity.location}, {activity.city}</span>
								<span class="map-result-meta">{activity.priceText} · {activity.duration}</span>
								<span class="badge-row">
									{#each activity.categories.slice(0, 2) as category}
										<CategoryBadge label={category} />
									{/each}
								</span>
							</span>
						</button>
					{/each}
				{/if}
			</div>
		</aside>
	</div>
</section>
