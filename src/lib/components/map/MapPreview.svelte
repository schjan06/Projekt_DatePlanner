<script>
	import RatingStars from '$lib/components/ui/RatingStars.svelte';

	let { activities = [], selected = null, onSelect = () => {} } = $props();

	function pinPosition(index) {
		const positions = [
			[24, 34],
			[52, 26],
			[70, 42],
			[38, 56],
			[62, 66],
			[82, 58],
			[31, 76],
			[47, 44]
		];
		return positions[index % positions.length];
	}
</script>

<div class="fake-map" aria-label="Simulierte Kartenansicht">
	{#each activities as activity, index}
		{@const position = pinPosition(index)}
		<button
			class={`map-pin ${selected?.id === activity.id ? 'active' : ''}`}
			style={`left: ${position[0]}%; top: ${position[1]}%;`}
			type="button"
			aria-label={`${activity.title} auf Karte anzeigen`}
			onclick={() => onSelect(activity)}
		>
			<span>{activity.title}</span>
		</button>
	{/each}

	{#if selected}
		<div class="map-popup card">
			<h3>{selected.title}</h3>
			<RatingStars rating={selected.rating} count={selected.reviewCount} />
			<p class="muted">{selected.location}, {selected.city}</p>
			<a class="button" href={`/activity/${selected.id}`}>Details oeffnen</a>
		</div>
	{/if}
</div>
