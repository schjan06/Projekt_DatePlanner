<script>
	import { onMount } from 'svelte';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';

	let { activities = [], selected = null, onSelect = () => {}, apiKey = '', mapId = 'DEMO_MAP_ID' } = $props();

	let mapElement = $state();
	let map;
	let markers = [];
	let loadError = $state('');

	function loadGoogleMaps() {
		if (window.google?.maps) return Promise.resolve(window.google);
		if (!apiKey) return Promise.reject(new Error('Google Maps API-Key fehlt.'));

		window.__vibematchGoogleMapsPromise ??= new Promise((resolve, reject) => {
			const callbackName = '__vibematchGoogleMapsReady';
			window[callbackName] = () => resolve(window.google);

			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&libraries=marker&callback=${callbackName}`;
			script.async = true;
			script.onerror = () => reject(new Error('Google Maps konnte nicht geladen werden.'));
			document.head.appendChild(script);
		});

		return window.__vibematchGoogleMapsPromise;
	}

	async function initialiseMap() {
		try {
			await loadGoogleMaps();
			const { Map } = await google.maps.importLibrary('maps');
			map = new Map(mapElement, {
				center: { lat: 47.3769, lng: 8.5417 },
				zoom: 9,
				mapId,
				disableDefaultUI: false,
				clickableIcons: false
			});
			renderMarkers();
		} catch (error) {
			loadError = error.message;
		}
	}

	async function renderMarkers() {
		if (!map || !window.google?.maps) return;
		const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');

		for (const marker of markers) marker.map = null;
		markers = [];

		const bounds = new google.maps.LatLngBounds();

		for (const activity of activities.filter((item) => item.latitude && item.longitude)) {
			const pin = new PinElement({
				background: selected?.id === activity.id ? '#ff7aa8' : '#7657ff',
				borderColor: '#ffffff',
				glyphColor: '#ffffff',
				glyph: '•'
			});
			const marker = new AdvancedMarkerElement({
				map,
				position: { lat: activity.latitude, lng: activity.longitude },
				title: activity.title,
				content: pin.element
			});
			marker.addListener('click', () => onSelect(activity));
			markers.push(marker);
			bounds.extend(marker.position);
		}

		if (markers.length > 1) map.fitBounds(bounds, 80);
		if (markers.length === 1) {
			map.setCenter(markers[0].position);
			map.setZoom(12);
		}
	}

	onMount(initialiseMap);

	$effect(() => {
		if (map) renderMarkers();
	});
</script>

<div class="google-map-shell">
	{#if loadError}
		<div class="map-fallback panel">
			<h2>Karte nicht verfügbar</h2>
			<p class="muted">{loadError}</p>
			<p class="muted">
				Bitte `PUBLIC_GOOGLE_MAPS_API_KEY` und `PUBLIC_GOOGLE_MAPS_MAP_ID` in der Umgebung setzen.
			</p>
		</div>
	{:else}
		<div class="google-map" bind:this={mapElement} aria-label="Google Maps Aktivitätenkarte"></div>
	{/if}

	{#if selected}
		<div class="map-popup card">
			<img src={selected.image} alt={selected.imageAlt ?? selected.title} />
			<h3>{selected.title}</h3>
			<RatingStars rating={selected.rating} count={selected.reviewCount} />
			<p class="muted">{selected.location}, {selected.city}</p>
			<a class="button" href={`/activity/${selected.id}`}>Details öffnen</a>
		</div>
	{/if}
</div>
