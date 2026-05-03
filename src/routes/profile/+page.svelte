<script>
	import { profile } from '$lib/data/profile';
	import StatCard from '$lib/components/profile/StatCard.svelte';
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Profil & Einstellungen</p>
			<h1>{profile.name}</h1>
			<p class="muted">{profile.location} · Mitglied seit {profile.memberSince}</p>
		</div>
		<button class="button" type="button">Profil bearbeiten</button>
	</div>

	<div class="profile-grid">
		<aside class="panel">
			<div class="avatar" style="width: 86px; height: 86px; font-size: 1.4rem;">{profile.avatar}</div>
			<h2 style="margin-top: 18px;">{profile.name}</h2>
			<p class="muted">
				Sammelt Aktivitaeten fuer spontane Wochenenden, ruhige Abende und gemeinsame Erinnerungen.
			</p>
			<a class="button ghost" href="/community">Freunde einladen</a>
		</aside>

		<div>
			<div class="stats-grid">
				{#each profile.stats as stat}
					<StatCard label={stat.label} value={stat.value} />
				{/each}
			</div>

			<div class="section panel">
				<h2>Einstellungen</h2>
				<div class="settings-list">
					{#each profile.settings as setting}
						<button type="button">
							<span>{setting}</span>
							<span>›</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
