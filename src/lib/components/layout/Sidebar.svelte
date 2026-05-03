<script>
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Inspiration', icon: 'IN' },
		{ href: '/categories', label: 'Kategorien', icon: 'FI' },
		{ href: '/map', label: 'Karte', icon: 'MA' },
		{ href: '/wishlist', label: 'Wishlist', icon: 'WI' },
		{ href: '/upcoming', label: 'Kommende', icon: 'PL' },
		{ href: '/history', label: 'Erinnerungen', icon: 'ER' },
		{ href: '/community', label: 'Community', icon: 'CO' },
		{ href: '/profile', label: 'Profil', icon: 'PR' }
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
				<span class="nav-icon">{link.icon}</span>
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
