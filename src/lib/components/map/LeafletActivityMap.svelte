<script>
	import 'leaflet/dist/leaflet.css';
	import { onDestroy, onMount } from 'svelte';
	import CategoryBadge from '$lib/components/ui/CategoryBadge.svelte';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';

	let { activities = [], selected = null, emptyText = '', onSelect = () => {} } = $props();

	let mapElement = $state();
	let loadError = $state('');
	let leaflet;
	let map;
	let markerLayer;

	function validActivities() {
		return activities.filter((activity) => Number.isFinite(activity.latitude) && Number.isFinite(activity.longitude));
	}

	function createMarkerIcon(activity) {
		const isSelected = selected?.id === activity.id;
		return leaflet.divIcon({
			className: `vibematch-marker ${isSelected ? 'selected' : ''}`,
			html: `<span><b>${activity.categories?.[0]?.slice(0, 1) ?? 'V'}</b></span>`,
			iconSize: [34, 44],
			iconAnchor: [17, 42],
			popupAnchor: [0, -38]
		});
	}

	function fitToMarkers(items) {
		if (!items.length) {
			map.setView([47.3769, 8.5417], 8);
			return;
		}

		if (items.length === 1) {
			map.setView([items[0].latitude, items[0].longitude], 13);
			return;
		}

		const bounds = leaflet.latLngBounds(items.map((activity) => [activity.latitude, activity.longitude]));
		map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 });
	}

	function renderMarkers() {
		if (!map || !leaflet || !markerLayer) return;
		const items = validActivities();
		markerLayer.clearLayers();

		for (const activity of items) {
			const marker = leaflet
				.marker([activity.latitude, activity.longitude], {
					icon: createMarkerIcon(activity),
					title: activity.title
				})
				.on('click', () => onSelect(activity));

			markerLayer.addLayer(marker);
		}

		fitToMarkers(items);
	}

	async function initialiseMap() {
		try {
			leaflet = await import('leaflet');
			map = leaflet.map(mapElement, {
				scrollWheelZoom: true,
				zoomControl: true
			});

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					maxZoom: 19,
					attribution: '&copy; OpenStreetMap contributors'
				})
				.addTo(map);

			markerLayer = leaflet.layerGroup().addTo(map);
			renderMarkers();
		} catch (error) {
			loadError = error.message || 'Leaflet konnte nicht geladen werden.';
		}
	}

	onMount(initialiseMap);

	onDestroy(() => {
		if (map) map.remove();
	});

	$effect(() => {
		if (map && markerLayer) renderMarkers();
	});
</script>

<div class="leaflet-map-shell">
	{#if loadError}
		<div class="map-fallback panel">
			<h2>Karte nicht verfügbar</h2>
			<p class="muted">{loadError}</p>
		</div>
	{:else}
		<div class="leaflet-map" bind:this={mapElement} aria-label="OpenStreetMap Aktivitätenkarte"></div>
	{/if}

	{#if !loadError && activities.length === 0}
		<div class="map-empty-overlay panel">
			<h2>Keine Marker gefunden</h2>
			<p class="muted">{emptyText}</p>
		</div>
	{/if}

	{#if selected}
		<aside class="map-detail-card card" aria-label="Ausgewählte Aktivität">
			<img src={selected.image} alt={selected.imageAlt ?? selected.title} />
			<div class="activity-body">
				<div class="badge-row">
					{#each selected.categories.slice(0, 3) as category}
						<CategoryBadge label={category} />
					{/each}
				</div>
				<h2>{selected.title}</h2>
				<p class="muted">{selected.description}</p>
				<RatingStars rating={selected.rating} count={selected.reviewCount} />
				<div class="meta-row">
					<span>{selected.location}, {selected.city}</span>
					<span>•</span>
					<span>{selected.priceText}</span>
					<span>•</span>
					<span>{selected.duration}</span>
				</div>
				<a class="button map-detail-action" href={`/activity/${selected.id}`}>Details ansehen</a>
			</div>
		</aside>
	{/if}
</div>
