<script>
	import { goto } from '$app/navigation';
	import ActivityListItem from '$lib/components/activities/ActivityListItem.svelte';
	import FilterPanel from '$lib/components/filters/FilterPanel.svelte';
	import { defaultFilters } from '$lib/utils/activityFilters';

	let { data } = $props();
	let filters = $state({ ...defaultFilters });
	const results = $derived(data.activities);
	const filterLabels = {
		search: 'Suche',
		category: 'Kategorie',
		price: 'Preis',
		duration: 'Dauer',
		city: 'Stadt',
		mood: 'Stimmung',
		people: 'Personen',
		rating: 'Bewertung',
		bestTime: 'Beste Zeit',
		sort: 'Sortierung'
	};
	const activeFilterChips = $derived(
		Object.entries(filters)
			.filter(([key, value]) => value && value !== defaultFilters[key])
			.map(([key, value]) => ({ key, label: filterLabels[key] ?? key, value }))
	);

	$effect(() => {
		Object.assign(filters, data.filters);
	});

	function syncUrl(nextFilters) {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(nextFilters)) {
			if (value && value !== defaultFilters[key]) params.set(key, value);
		}
		const query = params.toString();
		goto(query ? `/categories?${query}` : '/categories', { keepFocus: true, noScroll: true });
	}

	function setFilter(key, value) {
		syncUrl({ ...filters, [key]: value });
	}

	function resetFilters() {
		syncUrl(defaultFilters);
	}

	function removeFilter(key) {
		syncUrl({ ...filters, [key]: defaultFilters[key] });
	}
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Kategorien & Filter</p>
			<h1>Finde Ideen, die wirklich passen.</h1>
			<p class="muted">Suche direkt nach passenden Ideen und verfeinere die Ergebnisse bei Bedarf mit weiteren Filtern.</p>
		</div>
	</div>

	<FilterPanel
		{filters}
		onChange={setFilter}
		onReset={resetFilters}
		onRemoveFilter={removeFilter}
		resultCount={results.length}
		categoryOptions={data.categories}
		activeFilterChips={activeFilterChips}
		hasActiveFilters={activeFilterChips.length > 0}
	/>

	<div class="activity-list categories-results">
		{#each results as activity}
			<ActivityListItem {activity} />
		{/each}
		{#if !results.length}
			<div class="empty-state panel">
				<h2>Keine passenden Ideen</h2>
				<p class="muted">Setze einzelne Filter zurück, um wieder mehr Vorschläge zu sehen.</p>
			</div>
		{/if}
	</div>
</section>
