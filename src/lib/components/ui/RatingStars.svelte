<script>
	let { rating = 0, count = null } = $props();
	const rounded = $derived(Math.round(rating * 2) / 2);
</script>

<span class="rating" aria-label={`${rating} von 5 Sternen`}>
	{'★'.repeat(Math.floor(rounded))}{rounded % 1 ? '½' : ''} {rating.toFixed(1)}{#if count}
		<span class="muted">({count})</span>
	{/if}
</span>
