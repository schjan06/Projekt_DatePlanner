<script>
	import { filterOptions, sortOptions } from '$lib/utils/activityFilters';

	let {
		filters,
		onChange = () => {},
		onReset = () => {},
		onRemoveFilter = () => {},
		resultCount = 0,
		categoryOptions = [],
		activeFilterChips = [],
		hasActiveFilters = false
	} = $props();

	const filterLabels = {
		price: 'Preis',
		duration: 'Dauer',
		city: 'Stadt',
		mood: 'Stimmung',
		people: 'Personen',
		rating: 'Bewertung',
		bestTime: 'Beste Zeit'
	};
	const advancedFilters = ['price', 'duration', 'mood', 'people', 'rating', 'bestTime'];

	let showAdvancedFilters = $state(false);
</script>

<section class="filter-panel panel" aria-labelledby="filter-panel-title">
	<div class="filter-panel-header">
		<div>
			<p class="eyebrow">Filter</p>
			<h2 id="filter-panel-title">Aktivitäten entdecken</h2>
			<p class="muted">{resultCount} Ideen gefunden</p>
		</div>

		{#if hasActiveFilters}
			<button class="button secondary" type="button" onclick={onReset}>Filter zurücksetzen</button>
		{/if}
	</div>

	<div class="filter-grid primary-filter-grid">
		<label class="filter-group search-filter">
			<span>Suche</span>
			<input
				class="search-input"
				value={filters.search}
				placeholder="Titel, Ort oder Stimmung"
				oninput={(event) => onChange('search', event.currentTarget.value)}
			/>
		</label>

		<label class="filter-group">
			<span>Kategorie</span>
			<select class="select" value={filters.category} onchange={(event) => onChange('category', event.currentTarget.value)}>
				<option>Alle</option>
				{#each categoryOptions as category}
					<option>{category}</option>
				{/each}
			</select>
		</label>

		<label class="filter-group">
			<span>Stadt</span>
			<select class="select" value={filters.city} onchange={(event) => onChange('city', event.currentTarget.value)}>
				{#each filterOptions.city as option}
					<option>{option}</option>
				{/each}
			</select>
		</label>

		<button
			class="advanced-filter-toggle"
			type="button"
			aria-expanded={showAdvancedFilters}
			onclick={() => (showAdvancedFilters = !showAdvancedFilters)}
		>
			<span>{showAdvancedFilters ? 'Filter ausblenden' : 'Erweiterte Filter'}</span>
			<strong aria-hidden="true">{showAdvancedFilters ? '-' : '+'}</strong>
		</button>
	</div>

	{#if showAdvancedFilters}
		<div class="filter-grid advanced-filter-grid">
			{#each advancedFilters as key}
				<label class="filter-group">
					<span>{filterLabels[key]}</span>
					<select class="select" value={filters[key]} onchange={(event) => onChange(key, event.currentTarget.value)}>
						{#each filterOptions[key] as option}
							<option>{option}</option>
						{/each}
					</select>
				</label>
			{/each}

			<label class="filter-group">
				<span>Sortierung</span>
				<select class="select" value={filters.sort} onchange={(event) => onChange('sort', event.currentTarget.value)}>
					{#each sortOptions as option}
						<option>{option}</option>
					{/each}
				</select>
			</label>
		</div>
	{/if}

	{#if activeFilterChips.length}
		<div class="active-filter-row" role="group" aria-label="Aktive Filter">
			{#each activeFilterChips as chip (chip.key)}
				<button class="active-filter-chip" type="button" onclick={() => onRemoveFilter(chip.key)}>
					<span>{chip.label}: {chip.value}</span>
					<strong aria-hidden="true">&times;</strong>
				</button>
			{/each}
		</div>
	{/if}
</section>
