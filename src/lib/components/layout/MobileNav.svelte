<script>
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/categories', label: 'Filter' },
		{ href: '/map', label: 'Map' },
		{ href: '/wishlist', label: 'Wunsch' },
		{ href: '/profile', label: 'Profil' }
	];

	function isActive(href) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<nav class="mobile-nav" aria-label="Mobile Navigation">
	{#each links as link}
		<a class={isActive(link.href) ? 'active' : ''} href={link.href}>{link.label}</a>
	{/each}
</nav>
