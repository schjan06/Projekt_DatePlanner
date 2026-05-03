<script>
	import { getActivityById } from '$lib/data/activities';
	import { appState } from '$lib/state/appState.svelte.js';

	let view = $state('Liste');
	const planned = $derived(
		appState.plannedActivities
			.map((item) => ({ ...item, activity: getActivityById(item.activityId) }))
			.filter((item) => item.activity)
			.sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
	);
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Kommende Aktivitaeten</p>
			<h1>Was als Naechstes ansteht</h1>
			<p class="muted">Geplante Ideen mit Datum, Uhrzeit, Ort und Detailzugriff.</p>
		</div>
		<div class="action-row">
			<button class={`button ${view === 'Liste' ? '' : 'secondary'}`} type="button" onclick={() => (view = 'Liste')}>Liste</button>
			<button class={`button ${view === 'Kalender' ? '' : 'secondary'}`} type="button" onclick={() => (view = 'Kalender')}>Kalender</button>
			<a class="button ghost" href="/categories">Neue Aktivitaet planen</a>
		</div>
	</div>

	{#if view === 'Liste'}
		<div class="activity-list">
			{#each planned as item}
				<article class="activity-list-item card">
					<a href={`/activity/${item.activity.id}`}><img src={item.activity.image} alt={item.activity.title} /></a>
					<div>
						<p class="eyebrow">{item.date} · {item.time}</p>
						<h3>{item.activity.title}</h3>
						<p class="muted">{item.location}</p>
						<p>{item.notes}</p>
					</div>
					<a class="button secondary" href={`/activity/${item.activity.id}`}>Details</a>
				</article>
			{/each}
		</div>
	{:else}
		<div class="stats-grid">
			{#each planned as item}
				<a class="panel" href={`/activity/${item.activity.id}`}>
					<p class="eyebrow">{item.time}</p>
					<h2>{item.date}</h2>
					<h3>{item.activity.title}</h3>
					<p class="muted">{item.activity.city}</p>
				</a>
			{/each}
		</div>
	{/if}
</section>
