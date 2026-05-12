<script>
	import { goto, invalidateAll } from '$app/navigation';
	import StatCard from '$lib/components/profile/StatCard.svelte';
	import EditProfileModal from '$lib/components/profile/EditProfileModal.svelte';
	import ChangePasswordModal from '$lib/components/profile/ChangePasswordModal.svelte';
	import NotificationSettingsModal from '$lib/components/profile/NotificationSettingsModal.svelte';
	import HelpSupportModal from '$lib/components/profile/HelpSupportModal.svelte';
	import InviteFriendsModal from '$lib/components/profile/InviteFriendsModal.svelte';
	import ConfirmLogoutDialog from '$lib/components/profile/ConfirmLogoutDialog.svelte';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { data } = $props();
	const profile = $derived(data.profile);
	const settings = $derived(
		[
			{ label: 'Profil bearbeiten', description: 'Name, Ort, Bio und Vorlieben Ã¤ndern', modal: 'edit' },
			{ label: 'Benachrichtigungen', description: 'Prototyp-Einstellungen verwalten', modal: 'notifications' },
			{ label: 'Hilfe & Support', description: 'FAQ und Feedback Ã¶ffnen', modal: 'support' },
			{ label: 'Freunde einladen', description: 'Demo-Link teilen', modal: 'invite' },
			{ label: 'Ausloggen', description: 'Session beenden', modal: 'logout', danger: true }
		].filter((setting) => profile.settings?.includes(setting.label))
	);

	let activeModal = $state('');

	function statHref(label) {
		if (label.includes('Geplante')) return '/upcoming';
		if (label.includes('Gespeicherte')) return '/wishlist';
		if (label.includes('Vergangene')) return '/history';
		if (label.includes('Durchschnitt')) return '/history';
		return '/profile';
	}

	function categoryHref(category) {
		return `/categories?category=${encodeURIComponent(category)}`;
	}

	function avatarIsImage(value) {
		return /^https?:\/\//i.test(value || '');
	}

	function openSetting(setting) {
		activeModal = setting.modal;
	}

	async function refreshWithToast(message) {
		showToast(message);
		await invalidateAll();
	}

	async function logout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		await goto('/login', { invalidateAll: true });
	}
</script>

<section class="page profile-page">
	<header class="profile-hero panel">
		<div class="profile-identity">
			{#if avatarIsImage(profile.avatar)}
				<img class="avatar profile-avatar" src={profile.avatar} alt={`Profilbild von ${profile.username}`} />
			{:else}
				<div class="avatar profile-avatar">{profile.avatar}</div>
			{/if}
			<div>
				<p class="eyebrow">Profil & Einstellungen</p>
				<h1>{profile.name}</h1>
				<p class="muted">{profile.location || 'Ort nicht hinterlegt'} · Mitglied seit {profile.memberSince}</p>
				<p class="profile-bio">{profile.bio}</p>
			</div>
		</div>
		<div class="action-row">
			<button class="button secondary" type="button" onclick={() => (activeModal = 'password')}>Passwort Ã¤ndern</button>
			<button class="button" type="button" onclick={() => (activeModal = 'edit')}>Profil bearbeiten</button>
		</div>
	</header>

	<div class="stats-grid profile-stats">
		{#each profile.stats as stat}
			<a class="stat-link" href={statHref(stat.label)}>
				<StatCard label={stat.label} value={stat.value} />
			</a>
		{/each}
	</div>

	<div class="profile-detail-grid">
		<section class="panel profile-info-panel">
			<p class="eyebrow">Userprofil</p>
			<h2>PersÃ¶nliche Informationen</h2>
			<div class="profile-info-list">
				<div><span>Benutzername</span><strong>@{profile.username}</strong></div>
				<div><span>E-Mail</span><strong>{profile.email}</strong></div>
				<div><span>Ort</span><strong>{profile.location || 'Nicht hinterlegt'}</strong></div>
				<div><span>Bevorzugte Stadt</span><strong>{profile.preferences?.preferredCity || 'Nicht hinterlegt'}</strong></div>
				<div><span>Mitglied seit</span><strong>{profile.memberSince}</strong></div>
			</div>
		</section>

		<section class="panel profile-category-panel">
			<div class="section-header">
				<div>
					<p class="eyebrow">Vorlieben</p>
					<h2>Lieblingskategorien</h2>
					<p class="muted">Bewusst im Profil ausgewÃ¤hlt und in MongoDB gespeichert.</p>
				</div>
				<button class="button secondary" type="button" onclick={() => (activeModal = 'edit')}>Bearbeiten</button>
			</div>

			{#if profile.favoriteCategories?.length}
				<div class="profile-category-list" aria-label="Lieblingskategorien">
					{#each profile.favoriteCategories as category}
						<a class="badge profile-category-chip" href={categoryHref(category)}>{category}</a>
					{/each}
				</div>
			{:else}
				<div class="empty-state compact">
					<h3>Noch keine Lieblingskategorien ausgewÃ¤hlt.</h3>
					<p class="muted">Ã–ffne â€žProfil bearbeitenâ€œ, um deine Vorlieben per Chip-Auswahl zu setzen.</p>
				</div>
			{/if}

			{#if profile.derivedCategories?.length}
				<div class="derived-category-block">
					<h3>Aus deiner Nutzung erkannt</h3>
					<p class="muted">Basierend auf gespeicherten und erledigten AktivitÃ¤ten.</p>
					<div class="profile-category-list subtle" aria-label="Aus Nutzung erkannte Kategorien">
						{#each profile.derivedCategories as category}
							<a class="badge profile-category-chip subtle" href={categoryHref(category)}>{category}</a>
						{/each}
					</div>
				</div>
			{/if}
		</section>
	</div>

	<section class="section panel profile-settings-panel">
		<h2>Einstellungen</h2>
		<div class="settings-list">
			{#each settings as setting}
				<button class:danger={setting.danger} type="button" onclick={() => openSetting(setting)}>
					<span>
						<strong>{setting.label}</strong>
						<small>{setting.description}</small>
					</span>
					<span>â€º</span>
				</button>
			{/each}
		</div>
	</section>
</section>

<EditProfileModal profile={profile} open={activeModal === 'edit'} onClose={() => (activeModal = '')} onSaved={refreshWithToast} />
<ChangePasswordModal open={activeModal === 'password'} onClose={() => (activeModal = '')} onSaved={refreshWithToast} />
<NotificationSettingsModal profile={profile} open={activeModal === 'notifications'} onClose={() => (activeModal = '')} onSaved={refreshWithToast} />
<HelpSupportModal open={activeModal === 'support'} onClose={() => (activeModal = '')} onSent={refreshWithToast} />
<InviteFriendsModal profile={profile} open={activeModal === 'invite'} onClose={() => (activeModal = '')} onSent={refreshWithToast} />
<ConfirmLogoutDialog open={activeModal === 'logout'} onClose={() => (activeModal = '')} onConfirm={logout} />
