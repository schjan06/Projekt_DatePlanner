<script>
	import NavIcon from '$lib/components/layout/NavIcon.svelte';
	import PlannedActivityCard from './PlannedActivityCard.svelte';

	let { planned = [], onEdit = () => {}, onMove = () => {} } = $props();

	const today = new Date();
	const todayIso = toIsoDate(today);
	const weekdayLabels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

	let currentMonth = $state(new Date(today.getFullYear(), today.getMonth(), 1));
	let selectedDate = $state(todayIso);
	let draggedId = $state('');

	const monthLabel = $derived(
		new Intl.DateTimeFormat('de-CH', { month: 'long', year: 'numeric' }).format(currentMonth)
	);
	const itemsByDate = $derived(groupByDate(planned));
	const calendarDays = $derived(createCalendarDays(currentMonth));
	const selectedItems = $derived(itemsByDate.get(selectedDate) || []);
	const agendaGroups = $derived(groupAgenda(planned));

	function toIsoDate(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function groupByDate(items) {
		const grouped = new Map();
		for (const item of items) {
			if (!grouped.has(item.date)) grouped.set(item.date, []);
			grouped.get(item.date).push(item);
		}
		for (const group of grouped.values()) group.sort((a, b) => String(a.time).localeCompare(String(b.time)));
		return grouped;
	}

	function groupAgenda(items) {
		return [...groupByDate(items).entries()]
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([date, items]) => ({ date, items }));
	}

	function createCalendarDays(monthDate) {
		const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
		const startOffset = (first.getDay() + 6) % 7;
		const start = new Date(first);
		start.setDate(first.getDate() - startOffset);

		return Array.from({ length: 42 }, (_, index) => {
			const date = new Date(start);
			date.setDate(start.getDate() + index);
			return {
				iso: toIsoDate(date),
				label: date.getDate(),
				inMonth: date.getMonth() === monthDate.getMonth()
			};
		});
	}

	function changeMonth(offset) {
		const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
		currentMonth = nextMonth;
		selectedDate = toIsoDate(nextMonth);
	}

	function goToday() {
		currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
		selectedDate = todayIso;
	}

	function formatDate(value) {
		return new Intl.DateTimeFormat('de-CH', {
			weekday: 'long',
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(new Date(`${value}T12:00:00`));
	}

	function handleDragStart(event, item) {
		draggedId = item.id;
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/plain', item.id);
	}

	function handleDrop(event, date) {
		event.preventDefault();
		const id = draggedId || event.dataTransfer.getData('text/plain');
		const item = planned.find((entry) => entry.id === id);
		draggedId = '';
		if (!item || item.date === date) return;
		selectedDate = date;
		onMove(item, date);
	}
</script>

<section class="calendar-shell panel">
	<div class="calendar-header">
		<div class="calendar-title-block">
			<div class="calendar-title-row">
				<span class="calendar-title-icon">
					<NavIcon name="calendar" size={22} />
				</span>
				<div>
					<p class="eyebrow">Kalender</p>
					<h2>{monthLabel}</h2>
				</div>
			</div>
		</div>
		<div class="action-row">
			<button class="button secondary" type="button" onclick={() => changeMonth(-1)}>Zurück</button>
			<button class="button ghost" type="button" onclick={goToday}>Heute</button>
			<button class="button secondary" type="button" onclick={() => changeMonth(1)}>Weiter</button>
		</div>
	</div>

	<div class="calendar-weekdays">
		{#each weekdayLabels as label}
			<span>{label}</span>
		{/each}
	</div>

	<div class="calendar-grid">
		{#each calendarDays as day}
			<button
				class={`calendar-day ${!day.inMonth ? 'muted-day' : ''} ${day.iso === todayIso ? 'today' : ''} ${day.iso === selectedDate ? 'selected' : ''} ${draggedId ? 'drop-target' : ''}`}
				type="button"
				ondragover={(event) => event.preventDefault()}
				ondrop={(event) => handleDrop(event, day.iso)}
				onclick={() => (selectedDate = day.iso)}
			>
				<span class="calendar-day-number">{day.label}</span>
				{#each (itemsByDate.get(day.iso) || []).slice(0, 3) as item}
					<span
						class="calendar-event"
						draggable="true"
						role="button"
						tabindex="0"
						ondragstart={(event) => handleDragStart(event, item)}
						ondragend={() => (draggedId = '')}
						onclick={(event) => {
							event.stopPropagation();
							onEdit(item);
						}}
						onkeydown={(event) => {
							if (event.key === 'Enter' || event.key === ' ') {
								event.preventDefault();
								onEdit(item);
							}
						}}
					>
						<strong>{item.time}</strong> {item.activity.title}
					</span>
				{/each}
				{#if (itemsByDate.get(day.iso) || []).length > 3}
					<span class="calendar-more">+{(itemsByDate.get(day.iso) || []).length - 3} weitere</span>
				{/if}
			</button>
		{/each}
	</div>
</section>

<section class="calendar-agenda panel">
	<div class="section-header">
		<div>
			<p class="eyebrow">Ausgewählter Tag</p>
			<h2>{formatDate(selectedDate)}</h2>
		</div>
	</div>
	{#if selectedItems.length}
		<div class="activity-list">
			{#each selectedItems as item}
				<PlannedActivityCard {item} compact onEdit={onEdit} />
			{/each}
		</div>
	{:else}
		<p class="muted">Für diesen Tag ist noch nichts geplant.</p>
	{/if}
</section>

<section class="calendar-mobile-agenda panel">
	<p class="eyebrow">Agenda</p>
	{#if agendaGroups.length}
		<div class="mobile-agenda-groups">
			{#each agendaGroups as group}
				<div>
					<h3>{formatDate(group.date)}</h3>
					<div class="activity-list">
						{#each group.items as item}
							<PlannedActivityCard {item} compact onEdit={onEdit} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="muted">Noch keine Aktivitäten geplant.</p>
	{/if}
</section>
