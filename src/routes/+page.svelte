<script>
	import { activities, categories } from '$lib/data/activities';
	import ActivityGrid from '$lib/components/activities/ActivityGrid.svelte';
	import ActivityCard from '$lib/components/activities/ActivityCard.svelte';

	let search = $state('');

	const featured = activities[0];
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
</script>

<section class="page">
	<div class="hero" style={`--hero-image: url('${featured.image}')`}>
		<div>
			<p class="eyebrow">VibeMatch</p>
			<h1>Finde dein naechstes gemeinsames Erlebnis.</h1>
			<p>
				Entdecke Aktivitaeten fuer Dates, Freunde und Gruppen. Filtere nach Stimmung, Budget,
				Ort und Zeit und speichere Ideen fuer spaeter.
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
			<a class="button" href={`/activity/${featured.id}`}>Details oeffnen</a>
		</div>
	</div>

	<div class="quick-grid">
		{#each categories.slice(0, 8) as category}
			<a class="quick-card" href={`/categories?category=${encodeURIComponent(category)}`}>
				{category}
				<span>{activities.filter((activity) => activity.categories.includes(category)).length} Ideen</span>
			</a>
		{/each}
	</div>

	<div class="page-header">
		<div>
			<p class="eyebrow">Empfohlen</p>
			<h2>Aktivitaeten fuer dich</h2>
			<p class="muted">Suche direkt nach Orten, Stimmungen oder Aktivitaeten.</p>
		</div>
		<input class="search-input" style="max-width: 380px;" bind:value={search} placeholder="z.B. Zuerich, kreativ, Abend" />
	</div>

	{#if recommended.length}
		<ActivityGrid activities={recommended} />
	{:else}
		<div class="panel empty-state">
			<h2>Keine Treffer</h2>
			<p class="muted">Passe deine Suche an oder oeffne die Filterseite fuer mehr Optionen.</p>
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
				<ActivityCard {activity} />
			{/each}
		</div>
	</div>
</section>
