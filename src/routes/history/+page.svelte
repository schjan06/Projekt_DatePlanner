<script>
	import { historyItems } from '$lib/data/history';
	import { getActivityById } from '$lib/data/activities';
	import RatingStars from '$lib/components/ui/RatingStars.svelte';
	import ShareModal from '$lib/components/modals/ShareModal.svelte';

	let selectedActivity = $state(null);
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Vergangene Aktivitaeten</p>
			<h1>Erinnerungen</h1>
			<p class="muted">Bewertungen, Favoriten und kleine Rueckblicke auf bereits gemachte Erlebnisse.</p>
		</div>
	</div>

	<div class="memory-grid activity-grid">
		{#each historyItems as item}
			{@const activity = getActivityById(item.activityId)}
			{#if activity}
				<article class="card activity-card">
					<a class="activity-image-wrap" href={`/activity/${activity.id}`}>
						<img src={activity.image} alt={activity.title} />
					</a>
					<div class="activity-body">
						<p class="eyebrow">{item.date} {item.favorite ? '· Favorit' : ''}</p>
						<h3>{activity.title}</h3>
						<RatingStars rating={item.rating} />
						<p class="muted">{item.memory}</p>
						<div class="action-row">
							<a class="button secondary" href={`/activity/${activity.id}`}>Details</a>
							<button class="button ghost" type="button" onclick={() => (selectedActivity = activity)}>
								Erinnerung teilen
							</button>
						</div>
					</div>
				</article>
			{/if}
		{/each}
	</div>
</section>

<ShareModal activity={selectedActivity} open={Boolean(selectedActivity)} onClose={() => (selectedActivity = null)} />
