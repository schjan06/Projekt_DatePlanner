<script>
	import { appState } from '$lib/state/appState.svelte.js';
</script>

{#if appState.toast}
	<div class="toast" role="status">{appState.toast}</div>
{/if}
