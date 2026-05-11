<script>
	let { form } = $props();
</script>

<section class="login-page">
	<div class="login-card panel register-card">
		<div class="login-brand">
			<span class="brand-mark">VM</span>
			<p class="eyebrow">VibeMatch</p>
		</div>

		<div class="login-copy">
			<h1>Konto erstellen</h1>
			<p class="muted">Registriere dich und bestätige danach deine E-Mail-Adresse, bevor du dich einloggst.</p>
		</div>

		{#if form?.success}
			<div class="success-panel">
				<h2>Bestätigungsmail versendet</h2>
				<p>Wir haben eine E-Mail an <strong>{form.email}</strong> gesendet. Öffne den Link in der E-Mail, um dein Konto zu aktivieren.</p>
				<a class="button" href="/login">Zum Login</a>
			</div>
		{:else}
			<form class="login-form" method="POST">
				<label>
					Anzeigename
					<input class="field" name="displayName" autocomplete="name" value={form?.values?.displayName ?? ''} />
					{#if form?.fieldErrors?.displayName}<span class="field-error">{form.fieldErrors.displayName}</span>{/if}
				</label>
				<label>
					Benutzername
					<input class="field" name="username" autocomplete="username" value={form?.values?.username ?? ''} />
					{#if form?.fieldErrors?.username}<span class="field-error">{form.fieldErrors.username}</span>{/if}
				</label>
				<label>
					E-Mail
					<input class="field" name="email" type="email" autocomplete="email" value={form?.values?.email ?? ''} />
					{#if form?.fieldErrors?.email}<span class="field-error">{form.fieldErrors.email}</span>{/if}
				</label>
				<label>
					Passwort
					<input class="field" name="password" type="password" autocomplete="new-password" />
					{#if form?.fieldErrors?.password}<span class="field-error">{form.fieldErrors.password}</span>{/if}
				</label>
				<label>
					Passwort bestätigen
					<input class="field" name="confirmPassword" type="password" autocomplete="new-password" />
					{#if form?.fieldErrors?.confirmPassword}<span class="field-error">{form.fieldErrors.confirmPassword}</span>{/if}
				</label>

				{#if form?.error}
					<p class="form-error">{form.error}</p>
				{/if}

				<button class="button" type="submit">Registrieren</button>
				<a class="button secondary" href="/login">Ich habe bereits ein Konto</a>
			</form>
		{/if}
	</div>
</section>
