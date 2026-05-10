<script>
	import { showToast } from '$lib/state/appState.svelte.js';

	let { post } = $props();
	const activity = $derived(post.activity);
	let liked = $state(false);
	let saved = $state(false);
	let likes = $state(0);
	let comments = $state(0);
	let showCommentBox = $state(false);
	let commentText = $state('');
	let activePostId = $state('');

	$effect(() => {
		if (post.id !== activePostId) {
			activePostId = post.id;
			liked = false;
			saved = false;
			likes = Number(post.likes || 0);
			comments = Number(post.comments || 0);
		}
	});

	function toggleLike() {
		liked = !liked;
		likes += liked ? 1 : -1;
		showToast(liked ? 'Beitrag geliked' : 'Like entfernt');
	}

	function toggleSaved() {
		saved = !saved;
		showToast(saved ? 'Beitrag gespeichert' : 'Beitrag nicht mehr gespeichert');
	}

	function addComment(event) {
		event.preventDefault();
		if (!commentText.trim()) return;
		comments += 1;
		commentText = '';
		showCommentBox = false;
		showToast('Kommentar im Prototyp erfasst');
	}
</script>

<article class="post-card">
	<header class="post-header">
		<div class="avatar">{post.avatar}</div>
		<div>
			<strong>{post.userName}</strong>
			<p class="muted" style="margin: 0;">{post.userLocation} · {post.displayDate ?? post.createdAt}</p>
		</div>
	</header>
	<img src={post.images[0]} alt={activity?.imageAlt ?? activity?.title ?? 'Community Beitrag'} />
	<div class="post-body">
		<h3>{activity?.title}</h3>
		<p>{post.text}</p>
		<div class="community-actions">
			<button class:active={liked} type="button" onclick={toggleLike}>{likes} Likes</button>
			<button type="button" onclick={() => (showCommentBox = !showCommentBox)}>{comments} Kommentare</button>
			<button class:active={saved} type="button" onclick={toggleSaved}>{saved ? 'Gespeichert' : 'Speichern'}</button>
			<a href={`/activity/${post.activityId}`}>Aktivität ansehen</a>
		</div>
		{#if showCommentBox}
			<form class="community-comment-form" onsubmit={addComment}>
				<input class="field" bind:value={commentText} placeholder="Kurzen Kommentar schreiben" />
				<button class="button secondary" type="submit">Senden</button>
			</form>
		{/if}
	</div>
</article>
