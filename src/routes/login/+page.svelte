<script>
	import { page } from '$app/state';

	let { form } = $props();
	const verified = $derived(page.url.searchParams.get('verified') === '1');
</script>

<section class="login-page">
	<div class="login-card panel">
		<div class="login-brand">
			<span class="brand-mark">VM</span>
			<p class="eyebrow">VibeMatch</p>
		</div>

		<div class="login-copy">
			<h1>Willkommen zurück</h1>
			<p class="muted">Melde dich an, um Aktivitäten zu speichern, zu planen, zu bewerten und dein Profil zu verwalten.</p>
		</div>

		{#if verified}
			<p class="success-message">Deine E-Mail-Adresse wurde bestätigt. Du kannst dich jetzt einloggen.</p>
		{/if}

		<form class="login-form" method="POST">
			<label>
				Benutzername oder E-Mail
				<input class="field" name="username" autocomplete="username" value={form?.username ?? ''} />
			</label>
			<label>
				Passwort
				<input class="field" name="password" type="password" autocomplete="current-password" />
			</label>

			{#if form?.error}
				<p class="form-error">{form.error}</p>
			{/if}

			<button class="button" type="submit">Einloggen</button>
			<a class="button secondary" href="/register">Noch kein Konto? Registrieren</a>
		</form>
	</div>
</section>
