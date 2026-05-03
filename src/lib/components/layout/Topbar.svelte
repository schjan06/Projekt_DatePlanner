<script>
	import { appState } from '$lib/state/appState.svelte.js';
</script>

<header class="topbar">
	<label class="topbar-search">
		<span>Suche</span>
		<input aria-label="Globale Suche" placeholder="Aktivitaet, Ort oder Stimmung suchen" />
	</label>
	<div class="topbar-actions">
		<a class="button ghost" href="/wishlist">{appState.wishlistIds.length} gespeichert</a>
		<a class="avatar" href="/profile" aria-label="Profil oeffnen">NK</a>
	</div>
</header>
