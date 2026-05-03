<script>
	import { page } from '$app/state';
</script>

<header class="topbar">
	<label class="topbar-search">
		<span>Suche</span>
		<input aria-label="Globale Suche" placeholder="Aktivität, Ort oder Stimmung suchen" />
	</label>
	<div class="topbar-actions">
		<a class="button ghost" href="/wishlist">{page.data.wishlistCount ?? 0} gespeichert</a>
		<a class="avatar" href="/profile" aria-label="Profil öffnen">{page.data.profile?.avatar ?? 'NK'}</a>
	</div>
</header>
