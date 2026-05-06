<script>
	let { gallery = [], title = '', variant = 'panel', children } = $props();

	let currentIndex = $state(0);
	let touchStartX = 0;

	const slides = $derived(
		gallery
			.map((item) => (typeof item === 'string' ? { src: item, alt: title } : item))
			.filter((item) => item?.src)
	);
	const currentSlide = $derived(slides[currentIndex] ?? slides[0]);

	function showSlide(index) {
		if (!slides.length) return;
		currentIndex = (index + slides.length) % slides.length;
	}

	function previous() {
		showSlide(currentIndex - 1);
	}

	function next() {
		showSlide(currentIndex + 1);
	}

	function handleTouchStart(event) {
		touchStartX = event.changedTouches[0]?.clientX ?? 0;
	}

	function handleTouchEnd(event) {
		const touchEndX = event.changedTouches[0]?.clientX ?? 0;
		const distance = touchEndX - touchStartX;
		if (Math.abs(distance) < 48) return;
		if (distance < 0) next();
		else previous();
	}
</script>

{#if slides.length && variant === 'hero'}
	<div
		class="detail-hero gallery-hero"
		role="region"
		aria-label={`Bildergalerie zu ${title}`}
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
	>
		<img src={currentSlide.src} alt={currentSlide.alt ?? title} />

		{#if slides.length > 1}
			<button class="gallery-nav previous" type="button" aria-label="Vorheriges Bild" onclick={previous}
				>&lsaquo;</button
			>
			<button class="gallery-nav next" type="button" aria-label="Nächstes Bild" onclick={next}
				>&rsaquo;</button
			>
		{/if}

		<div class="gallery-hero-overlay">
			{@render children?.()}
		</div>

		<div class="gallery-hero-controls" aria-label="Galeriebilder auswählen">
			<div class="gallery-counter">{currentIndex + 1} / {slides.length}</div>
			{#if slides.length > 1}
				<div class="gallery-dots compact">
					{#each slides as slide, index}
						<button
							class:active={index === currentIndex}
							type="button"
							aria-label={`Bild ${index + 1} anzeigen`}
							aria-current={index === currentIndex ? 'true' : undefined}
							onclick={() => showSlide(index)}
						>
							<span></span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else if slides.length}
	<div
		class="activity-gallery"
		role="region"
		aria-label={`Bildergalerie zu ${title}`}
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
	>
		<div class="gallery-frame">
			<img src={currentSlide.src} alt={currentSlide.alt ?? title} />
			<div class="gallery-counter">{currentIndex + 1} / {slides.length}</div>

			{#if slides.length > 1}
				<button class="gallery-nav previous" type="button" aria-label="Vorheriges Bild" onclick={previous}
					>&lsaquo;</button
				>
				<button class="gallery-nav next" type="button" aria-label="Nächstes Bild" onclick={next}
					>&rsaquo;</button
				>
			{/if}
		</div>

		{#if slides.length > 1}
			<div class="gallery-dots" aria-label="Galeriebilder auswählen">
				{#each slides as slide, index}
					<button
						class:active={index === currentIndex}
						type="button"
						aria-label={`Bild ${index + 1} anzeigen`}
						aria-current={index === currentIndex ? 'true' : undefined}
						onclick={() => showSlide(index)}
					>
						<img src={slide.src} alt="" />
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}
