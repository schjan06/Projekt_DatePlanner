<script>
	import CommunityPostCard from '$lib/components/community/CommunityPostCard.svelte';
	import ShareModal from '$lib/components/modals/ShareModal.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';

	let { data } = $props();
	let tab = $state('Entdecken');
	let showShare = $state(false);
	const shareActivity = $derived(data.activities[0] ?? null);
	const tabs = ['Entdecken', 'Folge ich', 'Meine Beiträge'];
	const filteredPosts = $derived.by(() => {
		if (tab === 'Meine Beiträge') return data.communityPosts.filter((post) => post.userId === data.currentUserId);
		if (tab === 'Folge ich') return [];
		return data.communityPosts;
	});
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Community</p>
			<h1>Ideen teilen und entdecken</h1>
			<p class="muted">Beiträge anderer Personen mit Inspiration, Likes und Kommentaren.</p>
		</div>
		<button class="button" type="button" disabled={!shareActivity} onclick={() => (showShare = true)}>Idee teilen</button>
	</div>

	<div class="action-row" style="margin-bottom: 22px;">
		{#each tabs as item}
			<button class={`button ${tab === item ? '' : 'secondary'}`} type="button" onclick={() => (tab = item)}>{item}</button>
		{/each}
	</div>

	{#if filteredPosts.length}
		<div class="activity-grid">
			{#each filteredPosts as post}
				<CommunityPostCard {post} />
			{/each}
		</div>
	{:else if tab === 'Folge ich'}
		<EmptyState
			title="Noch keine gefolgten Beiträge"
			text="Ein echtes Folgen-System ist im Prototyp vorbereitet. Entdecke vorerst öffentliche Beiträge oder teile selbst eine Idee."
			actionHref="/community"
			actionLabel="Entdecken"
		/>
	{:else if tab === 'Meine Beiträge'}
		<EmptyState
			title="Noch keine eigenen Beiträge"
			text="Teile eine Aktivität oder Erinnerung, damit sie hier erscheint."
			actionHref="/history"
			actionLabel="Erinnerungen öffnen"
		/>
	{:else}
		<EmptyState
			title="Noch keine Community-Beiträge"
			text="Die Community ist leer oder Seed-Daten fehlen. Teile eine Aktivität, sobald Aktivitätsdaten vorhanden sind."
			actionHref="/categories"
			actionLabel="Aktivitäten entdecken"
		/>
	{/if}
</section>

<ShareModal activity={shareActivity} open={showShare} onClose={() => (showShare = false)} />
