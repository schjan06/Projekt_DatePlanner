<script>
	import { page } from '$app/state';
	import NavIcon from './NavIcon.svelte';

	const links = [
		{ href: '/', label: 'Inspiration', icon: 'sparkles' },
		{ href: '/activities/new', label: 'Erfassen', icon: 'plus' },
		{ href: '/categories', label: 'Kategorien', icon: 'filter' },
		{ href: '/map', label: 'Karte', icon: 'map' },
		{ href: '/wishlist', label: 'Wishlist', icon: 'heart' },
		{ href: '/upcoming', label: 'Kommende', icon: 'calendar' },
		{ href: '/history', label: 'Erinnerungen', icon: 'history' },
		{ href: '/community', label: 'Community', icon: 'users' },
		{ href: '/profile', label: 'Profil', icon: 'user' }
	];

	function isActive(href) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<aside class="sidebar" aria-label="Hauptnavigation">
	<a class="brand" href="/">
		<span class="brand-mark">VM</span>
		<span>VibeMatch</span>
	</a>

	<nav>
		{#each links as link}
			<a class={`nav-link ${isActive(link.href) ? 'active' : ''}`} href={link.href}>
				<span class="nav-icon"><NavIcon name={link.icon} /></span>
				<span>{link.label}</span>
			</a>
		{/each}
	</nav>

	<div class="sidebar-card">
		<p class="eyebrow">Heute passend</p>
		<h3>3 neue Ideen in deiner Nähe</h3>
		<p class="muted">Filtere nach Stimmung, Zeit und Budget, um schneller etwas Gutes zu finden.</p>
	</div>
</aside>
