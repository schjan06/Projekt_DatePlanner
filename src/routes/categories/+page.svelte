<script>
	import { goto } from '$app/navigation';
	import ActivityListItem from '$lib/components/activities/ActivityListItem.svelte';
	import FilterPanel from '$lib/components/filters/FilterPanel.svelte';
	import { defaultFilters } from '$lib/utils/activityFilters';

	let { data } = $props();
	let filters = $state({ ...defaultFilters });
	const results = $derived(data.activities);

	$effect(() => {
		Object.assign(filters, data.filters);
	});

	function syncUrl(nextFilters) {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(nextFilters)) {
			if (value && value !== defaultFilters[key]) params.set(key, value);
		}
		goto(`/categories?${params.toString()}`, { keepFocus: true, noScroll: true });
	}

	function setFilter(key, value) {
		syncUrl({ ...filters, [key]: value });
	}

	function resetFilters() {
		syncUrl(defaultFilters);
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
		<FilterPanel {filters} onChange={setFilter} onReset={resetFilters} resultCount={results.length} categoryOptions={data.categories} />
		<div class="activity-list">
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
	</div>
</section>
