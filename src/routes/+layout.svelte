<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import AppShell from '$lib/components/layout/AppShell.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>VibeMatch</title>
	<meta
		name="description"
		content="VibeMatch ist ein klickbarer Frontend-Prototyp fuer Aktivitaeten, Date-Ideen und gemeinsame Erlebnisse."
	/>
</svelte:head>

<AppShell>
	{@render children()}
</AppShell>
