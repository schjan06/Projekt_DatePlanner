<script>
	let { item, onEdit = () => {}, compact = false } = $props();

	function formatDate(value) {
		return new Intl.DateTimeFormat('de-CH', {
			weekday: 'short',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).format(new Date(`${value}T12:00:00`));
	}
</script>

<article class={`planned-card card ${compact ? 'compact' : ''}`}>
	<a class="planned-card-image" href={`/activity/${item.activity.id}`}>
		<img src={item.activity.image} alt={item.activity.imageAlt ?? item.activity.title} />
	</a>
	<div class="planned-card-body">
		<p class="eyebrow">{formatDate(item.date)} · {item.time}</p>
		<h3>{item.activity.title}</h3>
		<p class="muted">{item.location || item.activity.location}</p>
		{#if item.notes}
			<p class="planned-note">{item.notes}</p>
		{/if}
	</div>
	<div class="planned-card-actions">
		<button class="button ghost" type="button" onclick={() => onEdit(item)}>Bearbeiten</button>
		<a class="button secondary" href={`/activity/${item.activity.id}`}>Details</a>
	</div>
</article>
