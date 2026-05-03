<script>
	let { title, text, actionHref = '', actionLabel = '' } = $props();
</script>

<div class="empty-state panel">
	<h2>{title}</h2>
	<p class="muted">{text}</p>
	{#if actionHref && actionLabel}
		<a class="button" href={actionHref}>{actionLabel}</a>
	{/if}
</div>
