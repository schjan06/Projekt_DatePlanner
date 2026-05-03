<script>
	let { post } = $props();
	const activity = $derived(post.activity);
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
		<div class="meta-row">
			<span>{post.likes} Likes</span>
			<span>•</span>
			<span>{post.comments} Kommentare</span>
			<span>•</span>
			<a href={`/activity/${post.activityId}`}>Aktivität ansehen</a>
		</div>
	</div>
</article>
