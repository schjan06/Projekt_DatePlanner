<script>
	let { form } = $props();
	let mode = $state('login');

	$effect(() => {
		if (form?.mode) mode = form.mode;
	});
</script>

<section class="login-page">
	<div class="login-card panel">
		<div class="login-brand">
			<span class="brand-mark">VM</span>
			<p class="eyebrow">VibeMatch</p>
		</div>

		<div class="login-copy">
			<h1>{mode === 'login' ? 'Willkommen zurück' : 'Account erstellen'}</h1>
			<p class="muted">
				{mode === 'login'
					? 'Melde dich mit deinem bestehenden Account an.'
					: 'Erstelle einen Account und starte direkt mit deinen eigenen Ideen, Plänen und Favoriten.'}
			</p>
		</div>

		<div class="auth-switch" aria-label="Login-Modus auswählen">
			<button class:active={mode === 'login'} type="button" onclick={() => (mode = 'login')}>Einloggen</button>
			<button class:active={mode === 'signup'} type="button" onclick={() => (mode = 'signup')}>Account erstellen</button>
		</div>

		{#if mode === 'login'}
			<form class="login-form" method="POST" action="?/login">
				<label>
					Benutzername oder E-Mail
					<input class="field" name="username" autocomplete="username" value={form?.mode === 'login' ? form?.username || '' : ''} />
				</label>
				<label>
					Passwort
					<input class="field" name="password" type="password" autocomplete="current-password" />
				</label>

				{#if form?.mode === 'login' && form?.error}
					<p class="form-error">{form.error}</p>
				{/if}

				<button class="button" type="submit">Einloggen</button>
			</form>
		{:else}
			<form class="login-form" method="POST" action="?/signup">
				<label>
					Benutzername
					<input class="field" name="signupUsername" autocomplete="username" value={form?.values?.username || ''} />
				</label>
				<label>
					E-Mail
					<input class="field" name="email" type="email" autocomplete="email" value={form?.values?.email || ''} />
				</label>
				<label>
					Passwort
					<input class="field" name="signupPassword" type="password" autocomplete="new-password" />
				</label>
				<label>
					Passwort bestätigen
					<input class="field" name="confirmPassword" type="password" autocomplete="new-password" />
				</label>

				{#if form?.mode === 'signup' && form?.error}
					<p class="form-error">{form.error}</p>
				{/if}

				<button class="button" type="submit">Account erstellen</button>
			</form>
		{/if}
	</div>
</section>
