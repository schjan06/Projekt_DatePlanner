<script>
	import { page } from '$app/state';
	import { activities } from '$lib/data/activities';
	import ActivityListItem from '$lib/components/activities/ActivityListItem.svelte';
	import FilterPanel from '$lib/components/filters/FilterPanel.svelte';
	import { defaultFilters, filterActivities } from '$lib/utils/activityFilters';

	let filters = $state({ ...defaultFilters, category: page.url.searchParams.get('category') ?? 'Alle' });
	const results = $derived(filterActivities(activities, filters));

	function setFilter(key, value) {
		filters[key] = value;
	}

	function resetFilters() {
		Object.assign(filters, defaultFilters);
	}
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Kategorien & Filter</p>
			<h1>Finde Ideen, die wirklich passen.</h1>
			<p class="muted">Filtere nach Preis, Dauer, Ort, Stimmung, Personenanzahl, Bewertung und bester Zeit.</p>
		</div>
	</div>

	<div class="two-column">
		<FilterPanel {filters} onChange={setFilter} onReset={resetFilters} resultCount={results.length} />
		<div class="activity-list">
			{#each results as activity}
				<ActivityListItem {activity} />
			{/each}
			{#if !results.length}
				<div class="empty-state panel">
					<h2>Keine passenden Ideen</h2>
					<p class="muted">Setze einzelne Filter zurueck, um wieder mehr Vorschlaege zu sehen.</p>
				</div>
			{/if}
		</div>
	</div>
</section>
