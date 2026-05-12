import { error } from '@sveltejs/kit';
import { collection } from './db.js';
import { hashPassword, verifyPassword } from './auth.js';

function stripMongoId(document) {
	if (!document) return document;
	const { _id, ...rest } = document;
	return { ...rest, mongoId: _id?.toString?.() };
}

function stripMany(documents) {
	return documents.map(stripMongoId);
}

function publicUserName(user) {
	return user?.username || 'VibeMatch User';
}

function validationError(message) {
	const issue = new Error(message);
	issue.status = 400;
	return issue;
}

function requireUserId(userId) {
	const normalized = String(userId || '').trim();
	if (!normalized) throw error(401, 'Login erforderlich');
	return normalized;
}

function normalizeUsername(value = '') {
	return String(value).trim().toLowerCase();
}

function normalizeEmail(value = '') {
	return String(value).trim().toLowerCase();
}

function parseFavoriteCategories(value) {
	if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
	return String(value || '')
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean);
}

function isValidAvatar(value = '') {
	const trimmed = String(value).trim();
	if (!trimmed) return true;
	if (/^https?:\/\/\S+\.\S+/i.test(trimmed)) return true;
	return /^[\p{L}\p{N}]{1,8}$/u.test(trimmed);
}

function notificationDefaults(settings = {}) {
	return {
		plannedActivityReminders: settings.plannedActivityReminders ?? true,
		wishlistUpdates: settings.wishlistUpdates ?? false,
		communityUpdates: settings.communityUpdates ?? true,
		emailNotifications: settings.emailNotifications ?? false,
		pushNotifications: settings.pushNotifications ?? false
	};
}

function initialsFromName(value = '') {
	const parts = String(value || 'VM')
		.trim()
		.split(/\s+/)
		.filter(Boolean);
	return (parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0]?.slice(0, 2) || 'VM').toUpperCase();
}

function rankedCategoriesFromActivities(activities = []) {
	const counts = new Map();
	for (const activity of activities) {
		for (const category of activity?.categories || []) {
			counts.set(category, (counts.get(category) || 0) + 1);
		}
	}

	return [...counts.entries()]
		.sort(([categoryA, countA], [categoryB, countB]) => countB - countA || categoryA.localeCompare(categoryB, 'de-CH'))
		.map(([category]) => category);
}

function escapeRegex(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function priceLabel(priceLevel) {
	if (priceLevel === 0) return 'Kostenlos';
	return 'CHF';
}

function priceGroup(priceText = '') {
	if (priceText === 'Kostenlos') return 'Kostenlos';
	const match = priceText.match(/\d+/);
	const amount = match ? Number(match[0]) : null;
	if (amount === null) return 'CHF 21-50';
	if (amount <= 20) return 'bis CHF 20';
	if (amount <= 50) return 'CHF 21-50';
	return 'ab CHF 51';
}

function slugify(value = '') {
	return String(value)
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 70);
}

function arrayFromForm(value = '') {
	return String(value || '')
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean);
}

function priceLevelFromText(priceText = '') {
	if (priceText === 'Kostenlos') return 0;
	const match = priceText.match(/\d+/);
	const amount = match ? Number(match[0]) : 30;
	if (amount <= 20) return 1;
	if (amount <= 50) return 2;
	return 3;
}

function durationGroupFromDuration(duration = '', provided = '') {
	const durationGroups = ['Unter 1h', '1-3h', 'Halber Tag', 'Ganzer Tag'];
	if (durationGroups.includes(provided)) return provided;

	const value = String(duration || '').trim().toLowerCase().replace(',', '.');
	if (value.includes('ganzer tag') || value.includes('ganztag')) return 'Ganzer Tag';
	if (value.includes('halber tag') || value.includes('halbtag')) return 'Halber Tag';

	const match = value.match(/(\d+(?:\.\d+)?)/);
	if (!match) return '1-3h';

	const amount = Number(match[1]);
	const isMinutes = value.includes('min');
	const hours = isMinutes ? amount / 60 : amount;

	if (hours < 1) return 'Unter 1h';
	if (hours <= 3) return '1-3h';
	if (hours <= 6) return 'Halber Tag';
	return 'Ganzer Tag';
}

function fieldError(fieldErrors, field, message) {
	fieldErrors[field] = message;
}

function validateActivityInput(input, imageCount) {
	const fieldErrors = {};
	const categories = arrayFromForm(input.categories);
	const mood = arrayFromForm(input.mood);
	const bestTime = arrayFromForm(input.bestTime);
	const durationGroups = ['Unter 1h', '1-3h', 'Halber Tag', 'Ganzer Tag'];
	const peopleOptions = ['2 Personen', '2-4 Personen', '3-4 Personen', 'Gruppe'];
	const indoorOutdoorOptions = ['Indoor', 'Outdoor', 'Beides'];

	if (input.title.length < 3 || input.title.length > 80) fieldError(fieldErrors, 'title', 'Titel muss 3 bis 80 Zeichen lang sein.');
	if (input.description.length < 20 || input.description.length > 600) fieldError(fieldErrors, 'description', 'Beschreibung muss 20 bis 600 Zeichen lang sein.');
	if (!categories.length) fieldError(fieldErrors, 'categories', 'Wähle mindestens eine Kategorie.');
	if (input.city.length < 2) fieldError(fieldErrors, 'city', 'Stadt ist ein Pflichtfeld.');
	if (input.location.length < 2) fieldError(fieldErrors, 'location', 'Ort ist ein Pflichtfeld.');
	if (!input.priceText) fieldError(fieldErrors, 'priceText', 'Preis ist ein Pflichtfeld.');
	if (!input.duration) fieldError(fieldErrors, 'duration', 'Dauer ist ein Pflichtfeld.');
	if (!durationGroups.includes(input.durationGroup)) fieldError(fieldErrors, 'durationGroup', 'Wähle eine gültige Dauergruppe.');
	if (!peopleOptions.includes(input.people)) fieldError(fieldErrors, 'people', 'Wähle eine gültige Personenanzahl.');
	if (!indoorOutdoorOptions.includes(input.indoorOutdoor)) fieldError(fieldErrors, 'indoorOutdoor', 'Wähle Indoor, Outdoor oder Beides.');
	if (input.latitude && !Number.isFinite(Number(input.latitude))) fieldError(fieldErrors, 'latitude', 'Latitude muss eine gültige Zahl sein.');
	if (input.longitude && !Number.isFinite(Number(input.longitude))) fieldError(fieldErrors, 'longitude', 'Longitude muss eine gültige Zahl sein.');
	if ((input.latitude && !input.longitude) || (!input.latitude && input.longitude)) {
		fieldError(fieldErrors, 'coordinates', 'Latitude und Longitude müssen gemeinsam angegeben werden.');
	}
	if (imageCount > 5) fieldError(fieldErrors, 'images', 'Maximal 5 Bilder sind erlaubt.');

	return { fieldErrors, categories, mood, bestTime };
}

async function imageFromFile(file, alt) {
	if (!file || typeof file.arrayBuffer !== 'function' || file.size === 0) return null;
	const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
	if (!allowedTypes.includes(file.type)) throw validationError('Nur JPG, PNG oder WebP sind erlaubt.');
	if (file.size > 500 * 1024) throw validationError('Bilder dürfen maximal 500 KB gross sein.');
	const buffer = Buffer.from(await file.arrayBuffer());
	return {
		src: `data:${file.type};base64,${buffer.toString('base64')}`,
		alt
	};
}

function buildActivityQuery(filters = {}) {
	const and = [];
	const search = filters.search?.trim();

	if (search) {
		const regex = new RegExp(escapeRegex(search), 'i');
		and.push({
			$or: [
				{ title: regex },
				{ description: regex },
				{ city: regex },
				{ location: regex },
				{ categories: regex },
				{ mood: regex }
			]
		});
	}

	if (filters.category && filters.category !== 'Alle') and.push({ categories: filters.category });
	and.push({ $or: [{ status: 'active' }, { status: { $exists: false } }] });
	if (filters.city && filters.city !== 'Alle') and.push({ city: filters.city });
	if (filters.mood && filters.mood !== 'Alle') and.push({ mood: filters.mood });
	if (filters.people && filters.people !== 'Alle') and.push({ people: filters.people });
	if (filters.bestTime && filters.bestTime !== 'Alle') and.push({ bestTime: filters.bestTime });

	if (filters.duration && filters.duration !== 'Alle') {
		and.push({ durationGroup: filters.duration });
	}

	if (filters.rating && filters.rating !== 'Alle') {
		const minRating = filters.rating.includes('4.5') ? 4.5 : filters.rating.includes('4') ? 4 : 3;
		and.push({ rating: { $gte: minRating } });
	}

	return and.length ? { $and: and } : {};
}

function activitySort(sort = 'Empfohlen') {
	if (sort === 'Bewertung') return { rating: -1, reviewCount: -1, title: 1 };
	if (sort === 'Preis') return { priceLevel: 1, rating: -1, title: 1 };
	if (sort === 'Titel A-Z') return { title: 1 };
	return { rating: -1, title: 1 };
}

function durationRank(activity) {
	const durationOrder = { 'Unter 1h': 1, '1-3h': 2, 'Halber Tag': 3, 'Ganzer Tag': 4 };
	return durationOrder[activity.durationGroup] ?? 99;
}

function sortByDuration(activities) {
	return activities.sort((a, b) => durationRank(a) - durationRank(b) || a.title.localeCompare(b.title, 'de-CH'));
}

function filterByPriceGroup(activities, price = 'Alle') {
	if (!price || price === 'Alle') return activities;
	return activities.filter((activity) => priceGroup(activity.priceText) === price);
}

export async function getActivities(filters = {}) {
	const activities = await collection('activities');
	const query = buildActivityQuery(filters);
	if (filters.sort === 'Dauer') {
		return stripMany(sortByDuration(filterByPriceGroup(await activities.find(query).toArray(), filters.price)));
	}
	return stripMany(filterByPriceGroup(await activities.find(query).sort(activitySort(filters.sort)).toArray(), filters.price));
}

export async function getMapActivitiesByPlace(place = '') {
	const activities = await collection('activities');
	const trimmed = place.trim();
	const query = trimmed
		? {
				$or: [
					{ city: new RegExp(escapeRegex(trimmed), 'i') },
					{ location: new RegExp(escapeRegex(trimmed), 'i') }
				]
			}
		: {};

	return stripMany(await activities.find(query).sort({ city: 1, rating: -1, title: 1 }).toArray());
}

export async function getFeaturedActivities(limit = 6) {
	const activities = await collection('activities');
	return stripMany(await activities.find({}).sort({ rating: -1, reviewCount: -1 }).limit(limit).toArray());
}

export async function getActivityById(id) {
	const activities = await collection('activities');
	return stripMongoId(await activities.findOne({ id }));
}

export async function requireActivity(id) {
	const activity = await getActivityById(id);
	if (!activity) throw error(404, 'Aktivität nicht gefunden');
	return activity;
}

export async function getCategories() {
	const activities = await collection('activities');
	const values = await activities.distinct('categories');
	return values.sort((a, b) => a.localeCompare(b, 'de-CH'));
}

async function uniqueActivityId(title, city) {
	const activities = await collection('activities');
	const base = slugify(`${title}-${city}`) || `activity-${Date.now()}`;
	let candidate = base;
	let counter = 2;
	while (await activities.findOne({ id: candidate })) {
		candidate = `${base}-${counter}`;
		counter += 1;
	}
	return candidate;
}

export async function createActivity(formData, userId) {
	userId = requireUserId(userId);
	const duration = String(formData.get('duration') || '').trim();
	const input = {
		title: String(formData.get('title') || '').trim(),
		description: String(formData.get('description') || '').trim(),
		categories: String(formData.get('categories') || '').trim(),
		priceText: String(formData.get('priceText') || '').trim(),
		duration,
		durationGroup: durationGroupFromDuration(duration, String(formData.get('durationGroup') || '').trim()),
		location: String(formData.get('location') || '').trim(),
		city: String(formData.get('city') || '').trim(),
		address: String(formData.get('address') || '').trim(),
		latitude: String(formData.get('latitude') || '').trim(),
		longitude: String(formData.get('longitude') || '').trim(),
		bestTime: String(formData.get('bestTime') || '').trim(),
		season: String(formData.get('season') || '').trim(),
		people: String(formData.get('people') || '').trim(),
		indoorOutdoor: String(formData.get('indoorOutdoor') || '').trim(),
		mood: String(formData.get('mood') || '').trim(),
		tips: String(formData.get('tips') || '').trim(),
		requirements: String(formData.get('requirements') || '').trim(),
		imageAlt: String(formData.get('imageAlt') || '').trim()
	};
	const images = formData.getAll('images').filter((file) => file && typeof file.arrayBuffer === 'function' && file.size > 0);
	const { fieldErrors, categories, mood, bestTime } = validateActivityInput(input, images.length);

	if (Object.keys(fieldErrors).length) {
		const issue = validationError('Bitte prüfe die markierten Felder.');
		issue.fieldErrors = fieldErrors;
		throw issue;
	}

	const imageAlt = input.imageAlt || input.title;
	const gallery = [];
	for (const image of images) {
		const galleryImage = await imageFromFile(image, imageAlt);
		if (galleryImage) gallery.push(galleryImage);
	}

	const fallbackImage = {
		src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
		alt: imageAlt || 'VibeMatch Aktivität'
	};
	if (!gallery.length) gallery.push(fallbackImage);

	const now = new Date().toISOString();
	const id = await uniqueActivityId(input.title, input.city);
	const activity = {
		id,
		title: input.title,
		description: input.description,
		image: gallery[0].src,
		imageAlt: gallery[0].alt,
		imageCredit: images.length ? 'User upload' : 'Unsplash',
		gallery,
		categories,
		priceLevel: priceLevelFromText(input.priceText),
		priceText: input.priceText,
		duration: input.duration,
		durationGroup: input.durationGroup,
		location: input.location,
		city: input.city,
		address: input.address,
		rating: 0,
		reviewCount: 0,
		bestTime,
		season: arrayFromForm(input.season),
		people: input.people,
		indoorOutdoor: input.indoorOutdoor,
		mood: mood.length ? mood : categories,
		latitude: input.latitude ? Number(input.latitude) : null,
		longitude: input.longitude ? Number(input.longitude) : null,
		tips: arrayFromForm(input.tips),
		requirements: arrayFromForm(input.requirements),
		status: 'active',
		createdBy: userId,
		createdAt: now,
		updatedAt: now
	};

	const activities = await collection('activities');
	await activities.insertOne(activity);
	return stripMongoId(activity);
}

export async function getWishlistIds(userId) {
	userId = requireUserId(userId);
	const wishlist = await collection('wishlistItems');
	const items = await wishlist.find({ userId }).sort({ createdAt: -1 }).toArray();
	return items.map((item) => item.activityId);
}

export async function getWishlistActivities(userId) {
	userId = requireUserId(userId);
	const ids = await getWishlistIds(userId);
	if (!ids.length) return [];
	const activities = await collection('activities');
	return stripMany(await activities.find({ id: { $in: ids } }).toArray());
}

export async function addWishlistItem(activityId, userId) {
	userId = requireUserId(userId);
	await requireActivity(activityId);
	const wishlist = await collection('wishlistItems');
	await wishlist.updateOne(
		{ userId, activityId },
		{ $setOnInsert: { userId, activityId, createdAt: new Date().toISOString() } },
		{ upsert: true }
	);
	return getWishlistIds(userId);
}

export async function removeWishlistItem(activityId, userId) {
	userId = requireUserId(userId);
	const wishlist = await collection('wishlistItems');
	await wishlist.deleteOne({ userId, activityId });
	return getWishlistIds(userId);
}

export async function getReviews(activityId) {
	const reviews = await collection('reviews');
	return stripMany(await reviews.find({ activityId }).sort({ createdAt: -1 }).toArray());
}

export async function addReview({ activityId, userName, rating, comment, visitWith, visitDate, userId }) {
	await requireActivity(activityId);
	const reviews = await collection('reviews');
	const review = {
		id: `review-${Date.now()}`,
		activityId,
		userId: userId || '',
		userName: userName?.trim() || 'Gast',
		rating: Number(rating),
		comment: comment?.trim() || '',
		visitWith: visitWith?.trim() || '',
		visitDate: visitDate || '',
		date: new Intl.DateTimeFormat('de-CH').format(new Date()),
		createdAt: new Date().toISOString()
	};
	await reviews.insertOne(review);

	const allReviews = await reviews.find({ activityId }).toArray();
	const average = allReviews.reduce((sum, item) => sum + Number(item.rating), 0) / allReviews.length;
	const activities = await collection('activities');
	await activities.updateOne(
		{ id: activityId },
		{ $set: { rating: Math.round(average * 10) / 10, reviewCount: allReviews.length } }
	);

	return stripMongoId(review);
}

export async function addUserReview({ activityId, rating, comment, visitWith, visitDate }, userId) {
	userId = requireUserId(userId);
	const users = await collection('users');
	const user = stripMongoId(await users.findOne({ id: userId }));
	return addReview({
		activityId,
		userName: publicUserName(user),
		rating,
		comment,
		visitWith,
		visitDate,
		userId
	});
}

export async function getPlannedActivities(userId) {
	userId = requireUserId(userId);
	const planned = await collection('plannedActivities');
	const items = stripMany(
		await planned
			.find({ userId, $or: [{ status: 'planned' }, { status: { $exists: false } }] })
			.sort({ date: 1, time: 1 })
			.toArray()
	);
	const ids = [...new Set(items.map((item) => item.activityId))];
	const activities = await collection('activities');
	const activityMap = new Map((await activities.find({ id: { $in: ids } }).toArray()).map((item) => [item.id, stripMongoId(item)]));
	return items.map((item) => ({ ...item, activity: activityMap.get(item.activityId) })).filter((item) => item.activity);
}

function validatePlannedInput(input = {}) {
	const fieldErrors = {};
	const date = String(input.date || '').trim();
	const time = String(input.time || '').trim();
	const location = String(input.location || '').trim();
	const notes = String(input.notes || '').trim();

	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fieldError(fieldErrors, 'date', 'Datum muss im Format JJJJ-MM-TT sein.');
	if (!/^\d{2}:\d{2}$/.test(time)) fieldError(fieldErrors, 'time', 'Uhrzeit muss im Format HH:MM sein.');
	if (location.length > 120) fieldError(fieldErrors, 'location', 'Ort darf maximal 120 Zeichen lang sein.');
	if (notes.length > 300) fieldError(fieldErrors, 'notes', 'Notiz darf maximal 300 Zeichen lang sein.');

	if (Object.keys(fieldErrors).length) {
		const issue = validationError('Bitte prüfe die markierten Felder.');
		issue.fieldErrors = fieldErrors;
		throw issue;
	}

	return { date, time, location, notes };
}

export async function addPlannedActivity(activityId, details, userId) {
	userId = requireUserId(userId);
	await requireActivity(activityId);
	const planned = await collection('plannedActivities');
	const now = new Date().toISOString();
	const item = {
		id: `planned-${Date.now()}`,
		userId,
		activityId,
		date: details.date,
		time: details.time,
		location: details.location,
		notes: details.notes || '',
		status: 'planned',
		createdAt: now,
		updatedAt: now
	};
	await planned.insertOne(item);
	return stripMongoId(item);
}

export async function updatePlannedActivity(id, input, userId) {
	userId = requireUserId(userId);
	const values = validatePlannedInput(input);
	const planned = await collection('plannedActivities');
	const existing = await planned.findOne({ id, userId });
	if (!existing) throw error(404, 'Geplante Aktivität nicht gefunden');

	await planned.updateOne(
		{ id, userId },
		{
			$set: {
				...values,
				status: existing.status || 'planned',
				updatedAt: new Date().toISOString()
			}
		}
	);

	return stripMongoId(await planned.findOne({ id, userId }));
}

export async function deletePlannedActivity(id, userId) {
	userId = requireUserId(userId);
	const planned = await collection('plannedActivities');
	const result = await planned.deleteOne({ id, userId });
	if (!result.deletedCount) throw error(404, 'Geplante Aktivität nicht gefunden');
	return { success: true };
}

export async function completePlannedActivity(id, userId) {
	userId = requireUserId(userId);
	const planned = await collection('plannedActivities');
	const history = await collection('historyItems');
	const existing = stripMongoId(
		await planned.findOne({
			id,
			userId,
			$or: [{ status: 'planned' }, { status: { $exists: false } }]
		})
	);
	if (!existing) throw error(404, 'Geplante Aktivität nicht gefunden');

	const now = new Date().toISOString();
	const historyItem = {
		id: `history-${Date.now()}`,
		userId,
		activityId: existing.activityId,
		date: existing.date,
		rating: 0,
		favorite: false,
		memory: existing.notes || 'Aus der Planung abgeschlossen.',
		createdAt: now,
		updatedAt: now
	};

	await history.insertOne(historyItem);
	await planned.updateOne(
		{ id, userId },
		{
			$set: {
				status: 'completed',
				completedAt: now,
				updatedAt: now
			}
		}
	);

	return stripMongoId(historyItem);
}

export async function getHistoryItems(userId) {
	userId = requireUserId(userId);
	const history = await collection('historyItems');
	const items = stripMany(await history.find({ userId }).sort({ date: -1 }).toArray());
	const ids = [...new Set(items.map((item) => item.activityId))];
	const activities = await collection('activities');
	const activityMap = new Map((await activities.find({ id: { $in: ids } }).toArray()).map((item) => [item.id, stripMongoId(item)]));
	return items.map((item) => ({ ...item, activity: activityMap.get(item.activityId) })).filter((item) => item.activity);
}

export async function updateHistoryItem(id, input = {}, userId) {
	userId = requireUserId(userId);
	const history = await collection('historyItems');
	const existing = await history.findOne({ id, userId });
	if (!existing) throw error(404, 'Erinnerung nicht gefunden');

	const memory = String(input.memory || '').trim();
	const rating = Number(input.rating || 0);
	const favorite = Boolean(input.favorite);
	const fieldErrors = {};

	if (memory.length > 400) fieldError(fieldErrors, 'memory', 'Die Erinnerung darf maximal 400 Zeichen lang sein.');
	if (!Number.isFinite(rating) || rating < 0 || rating > 5) fieldError(fieldErrors, 'rating', 'Waehle eine Bewertung zwischen 0 und 5 Sternen.');

	if (Object.keys(fieldErrors).length) {
		const issue = validationError('Bitte pruefe die markierten Felder.');
		issue.fieldErrors = fieldErrors;
		throw issue;
	}

	await history.updateOne(
		{ id, userId },
		{
			$set: {
				memory,
				rating,
				favorite,
				updatedAt: new Date().toISOString()
			}
		}
	);

	return stripMongoId(await history.findOne({ id, userId }));
}

export async function getCommunityPosts() {
	const posts = await collection('communityPosts');
	const items = stripMany(await posts.find({}).sort({ createdAt: -1 }).toArray());
	const ids = [...new Set(items.map((item) => item.activityId))];
	const activities = await collection('activities');
	const activityMap = new Map((await activities.find({ id: { $in: ids } }).toArray()).map((item) => [item.id, stripMongoId(item)]));
	return items.map((item) => ({ ...item, activity: activityMap.get(item.activityId) }));
}

export async function addCommunityPost({ activityId, text, visibility = 'Öffentlich' }, userId) {
	userId = requireUserId(userId);
	const activity = await requireActivity(activityId);
	const posts = await collection('communityPosts');
	const users = await collection('users');
	const user = stripMongoId(await users.findOne({ id: userId }));
	const post = {
		id: `post-${Date.now()}`,
		userName: publicUserName(user),
		userLocation: 'Zürich',
		avatar: user?.avatar || 'VM',
		userLocation: user?.location || 'Schweiz',
		userId,
		activityId,
		text: text?.trim() || `Ich möchte diese Idee teilen: ${activity.title}`,
		visibility,
		images: [activity.image],
		likes: 0,
		comments: 0,
		createdAt: new Date().toISOString(),
		displayDate: 'Gerade eben'
	};
	await posts.insertOne(post);
	return stripMongoId(post);
}

export async function getProfile(userId) {
	userId = requireUserId(userId);
	const users = await collection('users');
	const profiles = await collection('profiles');
	const user = stripMongoId(await users.findOne({ id: userId }));
	const legacyProfile = stripMongoId(await profiles.findOne({ userId }));
	const preferences = user?.preferences || {};
	const profileName = user?.username || legacyProfile?.username || legacyProfile?.name || 'VibeMatch User';
	const profile = user
		? {
				userId: user.id,
				username: user.username,
				email: user.email,
				name: profileName,
				displayName: profileName,
				location: user.location || '',
				memberSince: user.memberSince || 'TODO',
				avatar: user.avatar || initialsFromName(profileName),
				bio:
					user.bio ||
					preferences.bio ||
					'Sammelt Aktivitäten für spontane Wochenenden, ruhige Abende und gemeinsame Erinnerungen.',
				preferences: {
					...preferences,
					preferredCity: preferences.preferredCity || user.preferredCity || user.location,
					favoriteCategories: preferences.favoriteCategories || user.favoriteCategories || [],
					notificationSettings: notificationDefaults(preferences.notificationSettings || user.notificationSettings || preferences)
				},
				settings: ['Profil bearbeiten', 'Benachrichtigungen', 'Hilfe & Support', 'Freunde einladen', 'Ausloggen']
			}
		: legacyProfile;
	if (profile && user && !user.bio && !preferences.bio) profile.bio = 'Noch keine Kurzbeschreibung hinterlegt.';
	const wishlistIds = await getWishlistIds(userId);
	const planned = await getPlannedActivities(userId);
	const history = await getHistoryItems(userId);
	const favoriteCategories = parseFavoriteCategories(profile?.preferences?.favoriteCategories || []);
	const activities = await collection('activities');
	const availableCategories = (await activities.distinct('categories')).sort((a, b) => a.localeCompare(b, 'de-CH'));
	const wishlistActivities = wishlistIds.length ? stripMany(await activities.find({ id: { $in: wishlistIds } }).toArray()) : [];
	const derivedCategories = rankedCategoriesFromActivities([...wishlistActivities, ...history.map((item) => item.activity).filter(Boolean)]).slice(0, 6);
	const ratedHistory = history.filter((item) => Number(item.rating) > 0);
	const average =
		ratedHistory.length > 0
			? Math.round((ratedHistory.reduce((sum, item) => sum + Number(item.rating), 0) / ratedHistory.length) * 10) / 10
			: 0;

	return {
		...profile,
		favoriteCategories,
		derivedCategories,
		availableCategories,
		stats: [
			{ label: 'Geplante Aktivitäten', value: String(planned.length) },
			{ label: 'Gespeicherte Ideen', value: String(wishlistIds.length) },
			{ label: 'Vergangene Aktivitäten', value: String(history.length) },
			{ label: 'Durchschnittsbewertung', value: average ? String(average) : '-' }
		]
	};
}

export async function updateProfile(userId, input = {}) {
	userId = requireUserId(userId);
	const users = await collection('users');
	const currentUser = await users.findOne({ id: userId });
	if (!currentUser) throw validationError('Profil wurde nicht gefunden.');

	const username = normalizeUsername(input.username || currentUser.username);
	const email = normalizeEmail(input.email || currentUser.email);
	const location = String(input.location || '').trim();
	const avatar = String(input.avatar || '').trim();
	const bio = String(input.bio || '').trim();
	const preferredCity = String(input.preferredCity || location || '').trim();
	const favoriteCategories = parseFavoriteCategories(input.favoriteCategories);
	const activities = await collection('activities');
	const availableCategorySet = new Set((await activities.distinct('categories')).map((category) => category.toLowerCase()));

	if (!/^[a-z0-9._-]{3,30}$/.test(username)) throw validationError('Der Benutzername muss 3 bis 30 Zeichen lang sein und darf Buchstaben, Zahlen, Punkt, Unterstrich oder Bindestrich enthalten.');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw validationError('Bitte gib eine gültige E-Mail-Adresse ein.');
	if (location && (location.length < 2 || location.length > 80)) throw validationError('Der Ort muss 2 bis 80 Zeichen lang sein.');
	if (!isValidAvatar(avatar)) throw validationError('Avatar muss ein kurzes Kürzel oder eine gültige http/https-URL sein.');
	if (bio.length > 240) throw validationError('Die Kurzbeschreibung darf maximal 240 Zeichen lang sein.');

	if (favoriteCategories.some((category) => !availableCategorySet.has(category.toLowerCase()))) {
		throw validationError('Bitte wähle nur vorhandene Kategorien aus.');
	}

	const usernameOwner = await users.findOne({ username });
	if (usernameOwner && usernameOwner.id !== userId) throw validationError('Dieser Benutzername ist bereits vergeben.');
	const emailOwner = await users.findOne({ email });
	if (emailOwner && emailOwner.id !== userId) throw validationError('Diese E-Mail-Adresse ist bereits registriert.');

	const update = {
		username,
		email,
		displayName: username,
		location,
		avatar,
		bio,
		'preferences.preferredCity': preferredCity,
		'preferences.favoriteCategories': favoriteCategories,
		updatedAt: new Date().toISOString()
	};

	for (const [key, value] of Object.entries(update)) {
		if (value === '') delete update[key];
	}

	await users.updateOne({ id: userId }, { $set: update });
	return getProfile(userId);
}

export async function updateNotificationSettings(userId, input = {}) {
	userId = requireUserId(userId);
	const users = await collection('users');
	const settings = notificationDefaults({
		plannedActivityReminders: Boolean(input.plannedActivityReminders),
		wishlistUpdates: Boolean(input.wishlistUpdates),
		communityUpdates: Boolean(input.communityUpdates),
		emailNotifications: Boolean(input.emailNotifications),
		pushNotifications: Boolean(input.pushNotifications)
	});

	await users.updateOne(
		{ id: userId },
		{
			$set: {
				'preferences.notificationSettings': settings,
				'preferences.notifications': Object.values(settings).some(Boolean),
				updatedAt: new Date().toISOString()
			}
		}
	);
	return getProfile(userId);
}

export async function updatePassword(userId, { currentPassword = '', newPassword = '', confirmPassword = '' } = {}) {
	userId = requireUserId(userId);
	const users = await collection('users');
	const user = await users.findOne({ id: userId });
	if (!user) throw validationError('User wurde nicht gefunden.');

	const currentValid = await verifyPassword(String(currentPassword).trim(), user.passwordHash);
	if (!currentValid) throw validationError('Das aktuelle Passwort ist falsch.');
	if (String(newPassword).length < 6) throw validationError('Das neue Passwort muss mindestens 6 Zeichen lang sein.');
	if (newPassword !== confirmPassword) throw validationError('Das neue Passwort und die Bestätigung stimmen nicht überein.');

	await users.updateOne(
		{ id: userId },
		{
			$set: {
				passwordHash: await hashPassword(String(newPassword)),
				updatedAt: new Date().toISOString()
			}
		}
	);
	return { success: true };
}

export { priceLabel };
