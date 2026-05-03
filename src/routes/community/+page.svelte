<script>
	import { activities } from '$lib/data/activities';
	import { communityPosts } from '$lib/data/communityPosts';
	import CommunityPostCard from '$lib/components/community/CommunityPostCard.svelte';
	import ShareModal from '$lib/components/modals/ShareModal.svelte';

	let tab = $state('Entdecken');
	let showShare = $state(false);
	const tabs = ['Entdecken', 'Folge ich', 'Meine Beitraege'];
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Community</p>
			<h1>Ideen teilen und entdecken</h1>
			<p class="muted">Beitraege anderer Personen mit Inspiration, Likes und Kommentaren.</p>
		</div>
		<button class="button" type="button" onclick={() => (showShare = true)}>Idee teilen</button>
	</div>

	<div class="action-row" style="margin-bottom: 22px;">
		{#each tabs as item}
			<button class={`button ${tab === item ? '' : 'secondary'}`} type="button" onclick={() => (tab = item)}>{item}</button>
		{/each}
	</div>

	<div class="activity-grid">
		{#each communityPosts as post}
			<CommunityPostCard {post} />
		{/each}
	</div>
</section>

<ShareModal activity={activities[0]} open={showShare} onClose={() => (showShare = false)} />
