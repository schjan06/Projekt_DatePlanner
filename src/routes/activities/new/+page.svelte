<script>
	import { goto } from '$app/navigation';
	import { showToast } from '$lib/state/appState.svelte.js';

	const categoryOptions = ['Romantisch', 'Aktiv', 'Kreativ', 'Essen & Trinken', 'Abenteuer', 'Entspannung', 'Draußen', 'Indoor'];
	const durationGroups = ['Unter 1h', '1-3h', 'Halber Tag', 'Ganzer Tag'];
	const peopleOptions = ['2 Personen', '2-4 Personen', '3-4 Personen', 'Gruppe'];
	const indoorOutdoorOptions = ['Indoor', 'Outdoor', 'Beides'];
	const moodOptions = ['Entspannt', 'Abenteuerlustig', 'Romantisch', 'Gesellig', 'Kreativ', 'Aktiv'];
	const bestTimeOptions = ['Frühling', 'Sommer', 'Herbst', 'Winter', 'Abend', 'Wochenende'];

	let title = $state('');
	let description = $state('');
	let categories = $state(['Aktiv']);
	let priceText = $state('');
	let duration = $state('');
	let durationGroup = $state('1-3h');
	let location = $state('');
	let city = $state('');
	let address = $state('');
	let latitude = $state('');
	let longitude = $state('');
	let people = $state('2 Personen');
	let indoorOutdoor = $state('Outdoor');
	let mood = $state(['Aktiv']);
	let bestTime = $state(['Wochenende']);
	let season = $state('');
	let tips = $state('');
	let requirements = $state('');
	let imageAlt = $state('');
	let previews = $state([]);
	let fieldErrors = $state({});
	let error = $state('');
	let saving = $state(false);

	const previewActivity = $derived({
		title: title || 'Neue Aktivität',
		description: description || 'Beschreibe kurz, warum diese Idee gut zu VibeMatch passt.',
		image: previews[0]?.url || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
		categories,
		priceText: priceText || 'Kostenlos',
		duration: duration || '2h',
		location: location || 'Ort',
		city: city || 'Stadt',
		rating: 0,
		reviewCount: 0
	});

	function toggleItem(list, value) {
		return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
	}

	function handleImages(event) {
		const files = Array.from(event.currentTarget.files || []);
		const next = [...previews];
		const allowed = ['image/jpeg', 'image/png', 'image/webp'];
		fieldErrors = { ...fieldErrors, images: '' };

		for (const file of files) {
			if (next.length >= 5) {
				fieldErrors = { ...fieldErrors, images: 'Maximal 5 Bilder sind erlaubt.' };
				break;
			}
			if (!allowed.includes(file.type)) {
				fieldErrors = { ...fieldErrors, images: 'Nur JPG, PNG oder WebP sind erlaubt.' };
				continue;
			}
			if (file.size > 500 * 1024) {
				fieldErrors = { ...fieldErrors, images: 'Bilder dürfen maximal 500 KB groß sein.' };
				continue;
			}
			next.push({ file, url: URL.createObjectURL(file), name: file.name });
		}
		previews = next;
		event.currentTarget.value = '';
	}

	function removeImage(index) {
		URL.revokeObjectURL(previews[index].url);
		previews = previews.filter((_, currentIndex) => currentIndex !== index);
	}

	function makePrimary(index) {
		if (index === 0) return;
		const next = [...previews];
		const [selected] = next.splice(index, 1);
		previews = [selected, ...next];
	}

	async function submit(event) {
		event.preventDefault();
		saving = true;
		error = '';
		fieldErrors = {};

		const formData = new FormData();
		formData.set('title', title);
		formData.set('description', description);
		formData.set('categories', categories.join(','));
		formData.set('priceText', priceText);
		formData.set('duration', duration);
		formData.set('durationGroup', durationGroup);
		formData.set('location', location);
		formData.set('city', city);
		formData.set('address', address);
		formData.set('latitude', latitude);
		formData.set('longitude', longitude);
		formData.set('bestTime', bestTime.join(','));
		formData.set('season', season);
		formData.set('people', people);
		formData.set('indoorOutdoor', indoorOutdoor);
		formData.set('mood', mood.join(','));
		formData.set('tips', tips);
		formData.set('requirements', requirements);
		formData.set('imageAlt', imageAlt || title);
		for (const preview of previews) formData.append('images', preview.file);

		const response = await fetch('/api/activities', {
			method: 'POST',
			body: formData
		});
		const body = await response.json().catch(() => ({}));

		if (response.ok) {
			showToast('Aktivität gespeichert');
			await goto(`/activity/${body.activity.id}`);
		} else {
			error = body.error || 'Aktivität konnte nicht gespeichert werden.';
			fieldErrors = body.fieldErrors || {};
		}
		saving = false;
	}
</script>

<section class="page">
	<div class="page-header">
		<div>
			<p class="eyebrow">Erfassen</p>
			<h1>Neue Aktivität erfassen</h1>
			<p class="muted">Erstelle eine neue Idee für VibeMatch. Pflichtfelder sind mit * markiert.</p>
		</div>
		<a class="button secondary" href="/">Abbrechen</a>
	</div>

	<form class="activity-create-layout" onsubmit={submit}>
		<div class="activity-create-form">
			<section class="panel form-grid">
				<div>
					<p class="eyebrow">Basis</p>
					<h2>Basisinformationen</h2>
				</div>
				<label>
					Titel *
					<input class="field" bind:value={title} maxlength="80" placeholder="z.B. Rooftop Spieleabend" />
					{#if fieldErrors.title}<span class="field-error">{fieldErrors.title}</span>{/if}
				</label>
				<label>
					Beschreibung *
					<textarea rows="4" bind:value={description} maxlength="600" placeholder="Was macht diese Aktivität besonders?"></textarea>
					{#if fieldErrors.description}<span class="field-error">{fieldErrors.description}</span>{/if}
				</label>
				<label>
					Bildbeschreibung
					<input class="field" bind:value={imageAlt} placeholder="Kurzer Alt-Text für das Hauptbild" />
				</label>
			</section>

			<section class="panel form-grid">
				<div>
					<p class="eyebrow">Ort & Zeit</p>
					<h2>Wo und wie lange?</h2>
				</div>
				<div class="two-column equal">
					<label>
						Ort *
						<input class="field" bind:value={location} placeholder="z.B. Drei Weieren" />
						{#if fieldErrors.location}<span class="field-error">{fieldErrors.location}</span>{/if}
					</label>
					<label>
						Stadt *
						<input class="field" bind:value={city} placeholder="z.B. St. Gallen" />
						{#if fieldErrors.city}<span class="field-error">{fieldErrors.city}</span>{/if}
					</label>
				</div>
				<label>
					Adresse optional
					<input class="field" bind:value={address} placeholder="Straße, Hausnummer oder Treffpunkt" />
				</label>
				<div class="two-column equal">
					<label>
						Latitude
						<input class="field" bind:value={latitude} placeholder="47.4245" />
						{#if fieldErrors.latitude}<span class="field-error">{fieldErrors.latitude}</span>{/if}
					</label>
					<label>
						Longitude
						<input class="field" bind:value={longitude} placeholder="9.3767" />
						{#if fieldErrors.longitude || fieldErrors.coordinates}<span class="field-error">{fieldErrors.longitude || fieldErrors.coordinates}</span>{/if}
					</label>
				</div>
				<div class="two-column equal">
					<label>
						Dauer *
						<input class="field" bind:value={duration} placeholder="z.B. 2h" />
						{#if fieldErrors.duration}<span class="field-error">{fieldErrors.duration}</span>{/if}
					</label>
					<label>
						Dauergruppe *
						<select class="select" bind:value={durationGroup}>
							{#each durationGroups as option}<option>{option}</option>{/each}
						</select>
					</label>
				</div>
			</section>

			<section class="panel form-grid">
				<div>
					<p class="eyebrow">Eigenschaften</p>
					<h2>Kategorien & Stimmung</h2>
				</div>
				<div>
					<span class="field-label">Kategorien *</span>
					<div class="choice-grid">
						{#each categoryOptions as option}
							<button class:active={categories.includes(option)} type="button" onclick={() => (categories = toggleItem(categories, option))}>{option}</button>
						{/each}
					</div>
					{#if fieldErrors.categories}<span class="field-error">{fieldErrors.categories}</span>{/if}
				</div>
				<div>
					<span class="field-label">Stimmung</span>
					<div class="choice-grid">
						{#each moodOptions as option}
							<button class:active={mood.includes(option)} type="button" onclick={() => (mood = toggleItem(mood, option))}>{option}</button>
						{/each}
					</div>
				</div>
				<div>
					<span class="field-label">Beste Zeit</span>
					<div class="choice-grid">
						{#each bestTimeOptions as option}
							<button class:active={bestTime.includes(option)} type="button" onclick={() => (bestTime = toggleItem(bestTime, option))}>{option}</button>
						{/each}
					</div>
				</div>
				<div class="two-column equal">
					<label>
						Personen *
						<select class="select" bind:value={people}>
							{#each peopleOptions as option}<option>{option}</option>{/each}
						</select>
					</label>
					<label>
						Indoor/Outdoor *
						<select class="select" bind:value={indoorOutdoor}>
							{#each indoorOutdoorOptions as option}<option>{option}</option>{/each}
						</select>
					</label>
				</div>
				<label>
					Saison optional
					<input class="field" bind:value={season} placeholder="z.B. Sommer, Herbst" />
				</label>
			</section>

			<section class="panel form-grid">
				<div>
					<p class="eyebrow">Preis</p>
					<h2>Budget & Vorbereitung</h2>
				</div>
				<div class="two-column equal">
					<label>
						Preis *
						<input class="field" bind:value={priceText} placeholder="Kostenlos, CHF 20 oder CHF 20-40" />
						{#if fieldErrors.priceText}<span class="field-error">{fieldErrors.priceText}</span>{/if}
					</label>
				</div>
				<label>
					Tipps
					<textarea rows="3" bind:value={tips} placeholder="Kommagetrennt, z.B. Jacke mitnehmen, vorher reservieren"></textarea>
				</label>
				<label>
					Was ihr braucht
					<textarea rows="3" bind:value={requirements} placeholder="Kommagetrennt, z.B. Picknickdecke, Getränke"></textarea>
				</label>
			</section>

			<section class="panel form-grid">
				<div>
					<p class="eyebrow">Bilder</p>
					<h2>Hauptbild & Galerie</h2>
					<p class="muted">Bis zu 5 Bilder, JPG/PNG/WebP, maximal 500 KB pro Bild.</p>
				</div>
				<label class="upload-drop">
					<input type="file" accept="image/jpeg,image/png,image/webp" multiple onchange={handleImages} />
					<span>Bilder auswählen</span>
				</label>
				{#if fieldErrors.images}<span class="field-error">{fieldErrors.images}</span>{/if}
				{#if previews.length}
					<div class="image-preview-grid">
						{#each previews as preview, index}
							<article>
								<img src={preview.url} alt={preview.name} />
								<div class="image-preview-actions">
									<button class="button ghost" type="button" onclick={() => makePrimary(index)}>{index === 0 ? 'Hauptbild' : 'Als Hauptbild'}</button>
									<button class="button secondary" type="button" onclick={() => removeImage(index)}>Entfernen</button>
								</div>
							</article>
						{/each}
					</div>
				{/if}
			</section>

			{#if error}
				<p class="form-error">{error}</p>
			{/if}

			<div class="action-row activity-create-actions">
				<button class="button" type="submit" disabled={saving}>{saving ? 'Speichern...' : 'Aktivität speichern'}</button>
				<a class="button secondary" href="/">Abbrechen</a>
			</div>
		</div>

		<aside class="panel activity-preview-panel">
			<p class="eyebrow">Vorschau</p>
			<div class="activity-card card">
				<div class="activity-image-wrap">
					<img src={previewActivity.image} alt={imageAlt || previewActivity.title} />
				</div>
				<div class="activity-body">
					<div class="badge-row">
						{#each previewActivity.categories.slice(0, 3) as category}
							<span class="badge">{category}</span>
						{/each}
					</div>
					<h3 style="margin-top: 14px;">{previewActivity.title}</h3>
					<p class="muted">{previewActivity.description}</p>
					<div class="meta-row">
						<span>{previewActivity.priceText}</span>
						<span>•</span>
						<span>{previewActivity.duration}</span>
						<span>•</span>
						<span>{previewActivity.city}</span>
					</div>
				</div>
			</div>
		</aside>
	</form>
</section>
