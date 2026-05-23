<script>
	const nextFeatures = [
		'Eigene Gruppen oder Freundeskreise',
		'Kommentare und Reaktionen auf geteilte Erlebnisse',
		'Follow-Logik für Personen oder Orte',
		'Moderation, Privatsphäre und Meldefunktionen'
	];

	const currentScope = [
		'Aktivitäten können als Prototyp geteilt werden',
		'Reviews und Rückblicksnotizen bleiben im aktuellen MVP nutzbar',
		'Community-Datenmodell und API bleiben als technische Vorstufe vorhanden'
	];
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Community</p>
			<h1>Geplant für ein späteres MVP</h1>
			<p class="muted">Die Community wird bewusst nicht als fertiges Social Feature ausgeliefert.</p>
		</div>
		<a class="button secondary" href="/categories">Aktivitäten entdecken</a>
	</div>

	<section class="panel community-roadmap-hero">
		<p class="eyebrow">MVP-2 Ausblick</p>
		<h2>Warum noch nicht jetzt?</h2>
		<p>
			VibeMatch konzentriert sich im aktuellen MVP auf Inspiration, Auswahl, Planung und Nachbearbeitung von
			Aktivitäten. Eine echte Community braucht klare Regeln für Privatsphäre, Moderation, Kommentare und
			Gruppenlogik. Diese Punkte werden deshalb transparent als nächste Produktiteration behandelt.
		</p>
	</section>

	<div class="two-column equal community-roadmap-grid">
		<section class="panel">
			<p class="eyebrow">Aktueller Prototyp</p>
			<h2>Was heute enthalten ist</h2>
			<div class="activity-list">
				{#each currentScope as item}
					<div class="info-tile">{item}</div>
				{/each}
			</div>
		</section>

		<section class="panel">
			<p class="eyebrow">MVP 2</p>
			<h2>Was später konzipiert wird</h2>
			<div class="activity-list">
				{#each nextFeatures as item}
					<div class="info-tile">{item}</div>
				{/each}
			</div>
		</section>
	</div>

	<section class="panel community-roadmap-note">
		<h2>Abgrenzung für die Abgabe</h2>
		<p class="muted">
			Teilen bleibt als sichtbarer Prototyp-Flow bestehen. Ein öffentlicher Feed, Follow-System,
			Produktiv-Kommentare und Community-Moderation sind nicht Teil des aktuellen Abgabeumfangs.
		</p>
	</section>
</section>
