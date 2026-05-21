<script>
	import { invalidateAll } from '$app/navigation';
	import NavIcon from '$lib/components/layout/NavIcon.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import ShareModal from '$lib/components/modals/ShareModal.svelte';
	import PlannedActivityCard from '$lib/components/upcoming/PlannedActivityCard.svelte';
	import PlannedActivityModal from '$lib/components/upcoming/PlannedActivityModal.svelte';
	import UpcomingCalendar from '$lib/components/upcoming/UpcomingCalendar.svelte';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { data } = $props();

	let view = $state('Liste');
	let selectedItem = $state(null);
	let shareActivity = $state(null);
	let modalOpen = $state(false);
	const planned = $derived(data.plannedActivities);

	function openEditor(item) {
		selectedItem = item;
		modalOpen = true;
	}

	function openShare(activity) {
		shareActivity = activity;
	}

	async function refreshWithToast(message) {
		showToast(message);
		await invalidateAll();
	}

	async function movePlannedActivity(item, date) {
		const response = await fetch(`/api/planned/${item.id}`, {
			method: 'PATCH',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				date,
				time: item.time,
				location: item.location || item.activity.location,
				notes: item.notes || ''
			})
		});

		if (response.ok) {
			await refreshWithToast('Termin verschoben');
		} else {
			await invalidateAll();
			showToast('Termin konnte nicht verschoben werden');
		}
	}
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Aktivitätenplan</p>
			<h1>Kommende Aktivitäten</h1>
			<p class="muted">Plane, verschiebe und verwalte deine nächsten Aktivitäten.</p>
		</div>
		<div class="action-row">
			<button class={`button ${view === 'Liste' ? '' : 'secondary'}`} type="button" onclick={() => (view = 'Liste')}>Liste</button>
			<button class={`button ${view === 'Kalender' ? '' : 'secondary'}`} type="button" onclick={() => (view = 'Kalender')}>
				<NavIcon name="calendar" size={18} />
				Kalender
			</button>
			<a class="button ghost" href="/categories">Neue Aktivität planen</a>
		</div>
	</div>

	{#if planned.length}
		{#if view === 'Liste'}
			<div class="activity-list">
				{#each planned as item}
					<PlannedActivityCard {item} onEdit={openEditor} onShare={openShare} />
				{/each}
			</div>
		{:else}
			<UpcomingCalendar {planned} onEdit={openEditor} onMove={movePlannedActivity} onShare={openShare} />
		{/if}
	{:else}
		<EmptyState title="Noch keine Aktivitäten geplant." text="Speichere eine Idee als Termin, damit sie hier in deiner Planung erscheint." actionHref="/categories" actionLabel="Aktivitäten entdecken" />
	{/if}
</section>

<PlannedActivityModal
	open={modalOpen}
	item={selectedItem}
	onClose={() => (modalOpen = false)}
	onSaved={refreshWithToast}
	onDeleted={refreshWithToast}
/>

<ShareModal
	activity={shareActivity}
	open={Boolean(shareActivity)}
	onClose={() => {
		shareActivity = null;
	}}
/>
