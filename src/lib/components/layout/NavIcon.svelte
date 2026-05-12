<script>
	let { name, size = 22 } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'sparkles'}
		<path d="M12 3l1.7 4.6L18 9.3l-4.3 1.7L12 15.5 10.3 11 6 9.3l4.3-1.7L12 3z" />
		<path d="M5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14z" />
		<path d="M19 14l.6 1.6L21 16.2l-1.4.6L19 18.5l-.6-1.7-1.4-.6 1.4-.6L19 14z" />
	{:else if name === 'plus'}
		<circle cx="12" cy="12" r="9" />
		<path d="M12 8v8" />
		<path d="M8 12h8" />
	{:else if name === 'filter'}
		<path d="M4 6h16" />
		<path d="M7 12h10" />
		<path d="M10 18h4" />
	{:else if name === 'map'}
		<path d="M12 21s7-4.4 7-11a7 7 0 0 0-14 0c0 6.6 7 11 7 11z" />
		<circle cx="12" cy="10" r="2.5" />
	{:else if name === 'heart'}
		<path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 1 0-7.2 7.2L12 21l8.8-8.2a5.1 5.1 0 0 0 0-7.2z" />
	{:else if name === 'calendar'}
		<rect x="3" y="5" width="18" height="16" rx="3" />
		<path d="M16 3v4" />
		<path d="M8 3v4" />
		<path d="M3 10h18" />
	{:else if name === 'history'}
		<path d="M3 12a9 9 0 1 0 3-6.7" />
		<path d="M3 4v6h6" />
		<path d="M12 7v5l3 2" />
	{:else if name === 'users'}
		<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
		<circle cx="9.5" cy="7" r="4" />
		<path d="M22 21v-2a4 4 0 0 0-3-3.9" />
		<path d="M16 3.2a4 4 0 0 1 0 7.6" />
	{:else if name === 'user'}
		<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	{:else}
		<circle cx="12" cy="12" r="9" />
	{/if}
</svg>
