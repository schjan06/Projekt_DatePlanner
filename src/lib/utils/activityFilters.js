export const defaultFilters = {
	search: '',
	category: 'Alle',
	price: 'Alle',
	duration: 'Alle',
	city: 'Alle',
	mood: 'Alle',
	people: 'Alle',
	rating: 'Alle',
	bestTime: 'Alle',
	sort: 'Empfohlen'
};

export const sortOptions = ['Empfohlen', 'Bewertung', 'Preis', 'Dauer', 'Titel A-Z'];

export const filterOptions = {
	price: ['Alle', 'Kostenlos', 'bis CHF 20', 'CHF 21-50', 'ab CHF 51'],
	duration: ['Alle', 'Unter 1h', '1-3h', 'Halber Tag', 'Ganzer Tag'],
	city: ['Alle', 'Zürich', 'St. Gallen', 'Winterthur', 'Luzern', 'Rapperswil', 'Appenzell'],
	mood: ['Alle', 'Entspannt', 'Abenteuerlustig', 'Romantisch', 'Gesellig', 'Kreativ', 'Aktiv'],
	people: ['Alle', '2 Personen', '2-4 Personen', '3-4 Personen', 'Gruppe'],
	rating: ['Alle', 'ab 3 Sterne', 'ab 4 Sterne', 'ab 4.5 Sterne'],
	bestTime: ['Alle', 'Frühling', 'Sommer', 'Herbst', 'Winter', 'Abend', 'Wochenende']
};

export function priceSymbol(priceLevel) {
	if (priceLevel === 0) return 'Kostenlos';
	return 'CHF';
}

export function priceGroup(priceText = '') {
	if (priceText === 'Kostenlos') return 'Kostenlos';
	const match = priceText.match(/\d+/);
	const amount = match ? Number(match[0]) : null;
	if (amount === null) return 'CHF 21-50';
	if (amount <= 20) return 'bis CHF 20';
	if (amount <= 50) return 'CHF 21-50';
	return 'ab CHF 51';
}

export function filterActivities(activities, filters) {
	const query = filters.search.trim().toLowerCase();

	return activities.filter((activity) => {
		const matchesSearch =
			!query ||
			activity.title.toLowerCase().includes(query) ||
			activity.city.toLowerCase().includes(query) ||
			activity.location.toLowerCase().includes(query) ||
			activity.mood.some((mood) => mood.toLowerCase().includes(query));

		const matchesCategory = filters.category === 'Alle' || activity.categories.includes(filters.category);
		const matchesPrice = filters.price === 'Alle' || priceGroup(activity.priceText) === filters.price;
		const matchesDuration =
			filters.duration === 'Alle' ||
			(filters.duration === 'Unter 1h' && activity.durationGroup === 'Unter 1h') ||
			(filters.duration === '1-3h' && activity.durationGroup === '1-3h') ||
			activity.durationGroup === filters.duration;
		const matchesCity = filters.city === 'Alle' || activity.city === filters.city;
		const matchesMood = filters.mood === 'Alle' || activity.mood.includes(filters.mood);
		const matchesPeople = filters.people === 'Alle' || activity.people === filters.people;
		const matchesRating =
			filters.rating === 'Alle' ||
			(filters.rating === 'ab 3 Sterne' && activity.rating >= 3) ||
			(filters.rating === 'ab 4 Sterne' && activity.rating >= 4) ||
			(filters.rating === 'ab 4.5 Sterne' && activity.rating >= 4.5);
		const matchesBestTime = filters.bestTime === 'Alle' || activity.bestTime.includes(filters.bestTime);

		return (
			matchesSearch &&
			matchesCategory &&
			matchesPrice &&
			matchesDuration &&
			matchesCity &&
			matchesMood &&
			matchesPeople &&
			matchesRating &&
			matchesBestTime
		);
	});
}
