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

	function openSetting(setting) {
		if (setting === 'Profil bearbeiten') activeModal = 'edit';
		if (setting === 'Benachrichtigungen') activeModal = 'notifications';
		if (setting === 'Hilfe & Support') activeModal = 'support';
		if (setting === 'Freunde einladen') activeModal = 'invite';
		if (setting === 'Ausloggen') activeModal = 'logout';
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

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Profil & Einstellungen</p>
			<h1>{profile.name}</h1>
			<p class="muted">{profile.location} · Mitglied seit {profile.memberSince}</p>
		</div>
		<div class="action-row">
			<button class="button secondary" type="button" onclick={() => (activeModal = 'password')}>Passwort ändern</button>
			<button class="button" type="button" onclick={() => (activeModal = 'edit')}>Profil bearbeiten</button>
		</div>
	</div>

	<div class="profile-grid">
		<aside class="panel">
			<div class="avatar" style="width: 86px; height: 86px; font-size: 1.4rem;">{profile.avatar}</div>
			<h2 style="margin-top: 18px;">{profile.name}</h2>
			<p class="muted">{profile.bio}</p>
			<p class="muted">{profile.username} · {profile.email}</p>
			<button class="button ghost" type="button" onclick={() => (activeModal = 'invite')}>Freunde einladen</button>
		</aside>

		<div>
			<div class="stats-grid">
				{#each profile.stats as stat}
					<a class="stat-link" href={statHref(stat.label)}>
						<StatCard label={stat.label} value={stat.value} />
					</a>
				{/each}
			</div>

			<div class="section panel profile-category-panel">
				<div class="section-header">
					<div>
						<p class="eyebrow">Vorlieben</p>
						<h2>Lieblingskategorien</h2>
						<p class="muted">Basierend auf deinem Profil, deiner Wishlist und deinen Erinnerungen.</p>
					</div>
					<button class="button secondary" type="button" onclick={() => (activeModal = 'edit')}>Bearbeiten</button>
				</div>

				{#if profile.categoryInsights?.length}
					<div class="profile-category-list" aria-label="Lieblingskategorien">
						{#each profile.categoryInsights as category}
							<a class="badge profile-category-chip" href={categoryHref(category)}>{category}</a>
						{/each}
					</div>
					<p class="muted profile-category-note">
						Manuelle Kategorien werden zuerst angezeigt, weitere Kategorien werden aus gespeicherten und erledigten Aktivitäten abgeleitet.
					</p>
				{:else}
					<div class="empty-state compact">
						<h3>Noch keine Lieblingskategorien erkennbar.</h3>
						<p class="muted">Speichere oder erledige Aktivitäten, damit VibeMatch dein Profil besser einordnen kann.</p>
						<a class="button secondary" href="/categories">Ideen entdecken</a>
					</div>
				{/if}
			</div>

			<div class="section panel">
				<h2>Einstellungen</h2>
				<div class="settings-list">
					{#each profile.settings as setting}
						<button type="button" onclick={() => openSetting(setting)}>
							<span>{setting}</span>
							<span>›</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<EditProfileModal profile={profile} open={activeModal === 'edit'} onClose={() => (activeModal = '')} onSaved={refreshWithToast} />
<ChangePasswordModal open={activeModal === 'password'} onClose={() => (activeModal = '')} onSaved={refreshWithToast} />
<NotificationSettingsModal profile={profile} open={activeModal === 'notifications'} onClose={() => (activeModal = '')} onSaved={refreshWithToast} />
<HelpSupportModal open={activeModal === 'support'} onClose={() => (activeModal = '')} onSent={refreshWithToast} />
<InviteFriendsModal profile={profile} open={activeModal === 'invite'} onClose={() => (activeModal = '')} onSent={refreshWithToast} />
<ConfirmLogoutDialog open={activeModal === 'logout'} onClose={() => (activeModal = '')} onConfirm={logout} />
