<script>
	import ActivityGrid from '$lib/components/activities/ActivityGrid.svelte';
	import ActivityCard from '$lib/components/activities/ActivityCard.svelte';

	let { data } = $props();
	let search = $state('');

	const activities = $derived(data.activities);
	const featured = $derived(data.featuredActivities[0] ?? data.activities[0]);
	const quickFilterGroups = [
		{ label: 'Stimmung', key: 'mood', items: ['Entspannt', 'Aktiv', 'Kreativ', 'Gesellig'] },
		{ label: 'Ort', key: 'city', items: ['Zürich', 'St. Gallen', 'Winterthur', 'Luzern'] },
		{ label: 'Budget', key: 'price', items: ['Kostenlos', 'CHF'] }
	];
	const recommended = $derived(
		activities
			.filter((activity) => {
				const query = search.trim().toLowerCase();
				if (!query) return true;
				return (
					activity.title.toLowerCase().includes(query) ||
					activity.city.toLowerCase().includes(query) ||
					activity.categories.some((category) => category.toLowerCase().includes(query)) ||
					activity.mood.some((mood) => mood.toLowerCase().includes(query))
				);
			})
			.slice(0, 6)
	);

	function quickFilterHref(key, value) {
		return `/categories?${key}=${encodeURIComponent(value)}`;
	}

	function countQuickFilter(key, value) {
		return activities.filter((activity) => {
			if (key === 'mood') return activity.mood.includes(value);
			if (key === 'city') return activity.city === value;
			if (key === 'price' && value === 'Kostenlos') return activity.priceLevel === 0;
			if (key === 'price' && value === 'CHF') return activity.priceLevel > 0;
			return false;
		}).length;
	}
</script>

<section class="page">
	<div class="hero" style={`--hero-image: url('${featured.image}')`}>
		<div>
			<p class="eyebrow">VibeMatch</p>
			<h1>Finde dein nächstes gemeinsames Erlebnis.</h1>
			<p>
				Entdecke Aktivitäten für Dates, Freunde und Gruppen. Filtere nach Stimmung, Budget,
				Ort und Zeit und speichere Ideen für später.
			</p>
			<div class="action-row">
				<a class="button" href="/categories">Ideen entdecken</a>
				<a class="button secondary" href="/map">Karte ansehen</a>
			</div>
		</div>
		<div class="hero-panel">
			<p class="eyebrow">Tipp des Tages</p>
			<h2>{featured.title}</h2>
			<p>{featured.description}</p>
			<a class="button" href={`/activity/${featured.id}`}>Details öffnen</a>
		</div>
	</div>

	<section class="quick-filter-panel panel" aria-label="Schnellfilter">
		<div class="quick-filter-intro">
			<p class="eyebrow">Schnellfilter</p>
		</div>

		<div class="quick-filter-groups">
			{#each quickFilterGroups as group}
				<div class="quick-filter-group">
					<h3>{group.label}</h3>
					<div class="quick-filter-chips">
						{#each group.items as item}
							<a class="quick-filter-chip" href={quickFilterHref(group.key, item)}>
								<span>{item}</span>
								<small>{countQuickFilter(group.key, item)} Ideen</small>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<div class="page-header">
		<div>
			<p class="eyebrow">Empfohlen</p>
			<h2>Aktivitäten für dich</h2>
			<p class="muted">Suche direkt nach Orten, Stimmungen oder Aktivitäten.</p>
		</div>
		<input class="search-input" style="max-width: 380px;" bind:value={search} placeholder="z.B. Zürich, kreativ, Abend" />
	</div>

	{#if recommended.length}
		<ActivityGrid activities={recommended} wishlistIds={data.wishlistIds} />
	{:else}
		<div class="panel empty-state">
			<h2>Keine Treffer</h2>
			<p class="muted">Passe deine Suche an oder öffne die Filterseite für mehr Optionen.</p>
		</div>
	{/if}

	<div class="section">
		<div class="page-header">
			<div>
				<p class="eyebrow">Beliebt</p>
				<h2>Schnell planbare Highlights</h2>
			</div>
			<a class="button secondary" href="/upcoming">Geplante ansehen</a>
		</div>
		<div class="activity-grid">
			{#each activities.slice(6, 9) as activity}
				<ActivityCard {activity} wishlistIds={data.wishlistIds} />
			{/each}
		</div>
	</div>
</section>
