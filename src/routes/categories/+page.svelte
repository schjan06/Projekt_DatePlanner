<script>
	import { goto } from '$app/navigation';
	import ActivityListItem from '$lib/components/activities/ActivityListItem.svelte';
	import FilterPanel from '$lib/components/filters/FilterPanel.svelte';
	import { defaultFilters, sortOptions } from '$lib/utils/activityFilters';

	let { data } = $props();
	let filters = $state({ ...defaultFilters });
	const results = $derived(data.activities);
	const filterLabels = {
		search: 'Suche',
		category: 'Kategorie',
		price: 'Budget',
		duration: 'Dauer',
		city: 'Ort',
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
			<p class="muted">Filtere nach Preis, Dauer, Ort, Stimmung, Personenanzahl, Bewertung und bester Zeit.</p>
		</div>
	</div>

	<div class="two-column">
		<FilterPanel {filters} onChange={setFilter} onReset={resetFilters} resultCount={results.length} categoryOptions={data.categories} />
		<div>
			<div class="results-panel panel">
				<div class="results-toolbar">
					<div>
						<p class="eyebrow">Ergebnisse</p>
						<h2>{results.length} Ideen</h2>
					</div>

					<label class="sort-control">
						<span>Sortieren nach</span>
						<select class="select" value={filters.sort} onchange={(event) => setFilter('sort', event.currentTarget.value)}>
							{#each sortOptions as option}
								<option>{option}</option>
							{/each}
						</select>
					</label>
				</div>

				{#if activeFilterChips.length}
					<div class="active-filter-row" role="group" aria-label="Aktive Filter">
						{#each activeFilterChips as chip (chip.key)}
							<button class="active-filter-chip" type="button" onclick={() => removeFilter(chip.key)}>
								<span>{chip.label}: {chip.value}</span>
								<strong aria-hidden="true">&times;</strong>
							</button>
						{/each}
						<button class="active-filter-reset" type="button" onclick={resetFilters}>Alle zurücksetzen</button>
					</div>
				{/if}
			</div>

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
	</div>
</section>
