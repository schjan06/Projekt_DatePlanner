<script>
	let { options = [], value = '', onChange = () => {} } = $props();
</script>

<div class="badge-row" role="group">
	{#each options as option}
		<button
			class={`button ${value === option ? '' : 'secondary'}`}
			type="button"
			onclick={() => onChange(option)}
		>
			{option}
		</button>
	{/each}
</div>
