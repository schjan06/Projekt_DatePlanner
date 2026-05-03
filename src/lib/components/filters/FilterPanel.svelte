<script>
	import { filterOptions } from '$lib/utils/activityFilters';

	let { filters, onChange = () => {}, onReset = () => {}, resultCount = 0, categoryOptions = [] } = $props();
</script>

<aside class="filter-panel panel">
	<div>
		<p class="eyebrow">Filter</p>
		<h2>{resultCount} Ideen anzeigen</h2>
	</div>

	<label class="filter-group">
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

	{#each Object.entries(filterOptions) as [key, options]}
		<label class="filter-group">
			<span>{key === 'bestTime' ? 'Beste Zeit' : key}</span>
			<select class="select" value={filters[key]} onchange={(event) => onChange(key, event.currentTarget.value)}>
				{#each options as option}
					<option>{option}</option>
				{/each}
			</select>
		</label>
	{/each}

	<button class="button secondary" type="button" onclick={onReset}>Filter zurücksetzen</button>
</aside>
