<script>
	let { data } = $props();
</script>

<section class="login-page">
	<div class="login-card panel">
		<div class="login-brand">
			<span class="brand-mark">VM</span>
			<p class="eyebrow">VibeMatch</p>
		</div>
		<div class="login-copy">
			<h1>E-Mail konnte nicht bestätigt werden</h1>
			<p class="muted">{data.error}</p>
		</div>
		<a class="button" href="/register">Neu registrieren</a>
		<a class="button secondary" href="/login">Zum Login</a>
	</div>
</section>
