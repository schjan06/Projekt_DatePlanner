<script>
	import Sidebar from './Sidebar.svelte';
	import Topbar from './Topbar.svelte';
	import MobileNav from './MobileNav.svelte';
	import Toast from '$lib/components/ui/Toast.svelte';

	let { children } = $props();
</script>

<div class="app-shell">
	<Sidebar />
	<main class="app-main">
		<Topbar />
		{@render children()}
	</main>
	<MobileNav />
	<Toast />
</div>
