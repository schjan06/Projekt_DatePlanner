<script>
	import NavIcon from '$lib/components/layout/NavIcon.svelte';
	import { showToast } from '$lib/state/appState.svelte.js';

	let { activity, open = false, onClose = () => {} } = $props();
	const shareUrl = $derived.by(() => {
		if (!activity) return '';
		if (typeof window === 'undefined') return `/activity/${activity.id}`;
		return `${window.location.origin}/activity/${activity.id}`;
	});
	const shareText = $derived.by(() => {
		if (!activity) return '';
		return `VibeMatch-Idee: ${activity.title}.`;
	});

	function handleKeydown(event) {
		if (open && event.key === 'Escape') onClose();
	}

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(shareUrl);
			showToast('Link kopiert');
		} catch {
			showToast('Link konnte nicht kopiert werden');
		}
	}

	async function shareSystem() {
		if (navigator.share) {
			try {
				await navigator.share({
					title: activity.title,
					text: shareText,
					url: shareUrl
				});
				return;
			} catch (issue) {
				if (issue?.name === 'AbortError') return;
			}
		}
		await copyLink();
	}

	function shareWhatsApp() {
		const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open && activity}
	<div class="modal-backdrop">
		<div class="modal share-modal" role="dialog" aria-modal="true" aria-label="Idee teilen">
			<div class="share-modal-header">
				<div>
					<p class="eyebrow">Teilen</p>
					<h2>{activity.title}</h2>
				</div>
				<button class="modal-close" type="button" aria-label="Teilen schliessen" onclick={onClose}>×</button>
			</div>

			<div class="share-preview">
				<img src={activity.image} alt={activity.imageAlt ?? activity.title} />
				<div>
					<strong>{activity.title}</strong>
					<span>{activity.location}, {activity.city}</span>
					<span>{activity.priceText} · {activity.duration}</span>
				</div>
			</div>

			<div class="share-action-grid" aria-label="Schnell teilen">
				<button class="button" type="button" onclick={shareSystem}>
					<NavIcon name="share" size={18} />
					Teilen
				</button>
				<button class="button secondary" type="button" onclick={copyLink}>Link kopieren</button>
				<button class="button ghost" type="button" onclick={shareWhatsApp}>WhatsApp</button>
			</div>

			<div class="action-row share-modal-actions">
				<button class="button secondary" type="button" onclick={onClose}>Abbrechen</button>
			</div>
		</div>
	</div>
{/if}
