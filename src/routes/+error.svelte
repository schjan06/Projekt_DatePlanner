<script>
	import { page } from '$app/state';
</script>

<section class="page error-page">
	<div class="panel error-panel">
		<p class="eyebrow">VibeMatch</p>
		<h1>Gerade ist etwas schiefgelaufen.</h1>
		<p class="muted">
			{page.error?.message || 'Die Seite konnte nicht geladen werden. Pruefe bitte die Verbindung zur Datenbank und versuche es erneut.'}
		</p>
		<div class="action-row">
			<a class="button" href="/">Zur Inspiration</a>
			<a class="button secondary" href="/login">Zum Login</a>
		</div>
	</div>
</section>
