<script>
	import CommunityPostCard from '$lib/components/community/CommunityPostCard.svelte';
	import ShareModal from '$lib/components/modals/ShareModal.svelte';

	let { data } = $props();
	let tab = $state('Entdecken');
	let showShare = $state(false);
	const tabs = ['Entdecken', 'Folge ich', 'Meine Beiträge'];
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Community</p>
			<h1>Ideen teilen und entdecken</h1>
			<p class="muted">Beiträge anderer Personen mit Inspiration, Likes und Kommentaren.</p>
		</div>
		<button class="button" type="button" onclick={() => (showShare = true)}>Idee teilen</button>
	</div>

	<div class="action-row" style="margin-bottom: 22px;">
		{#each tabs as item}
			<button class={`button ${tab === item ? '' : 'secondary'}`} type="button" onclick={() => (tab = item)}>{item}</button>
		{/each}
	</div>

	<div class="activity-grid">
		{#each data.communityPosts as post}
			<CommunityPostCard {post} />
		{/each}
	</div>
</section>

<ShareModal activity={data.activities[0]} open={showShare} onClose={() => (showShare = false)} />
