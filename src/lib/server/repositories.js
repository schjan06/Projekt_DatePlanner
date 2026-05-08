import { error } from '@sveltejs/kit';
import { collection } from './db.js';
import { hashPassword, verifyPassword } from './auth.js';

export const DEMO_USER_ID = 'demo-user';

function stripMongoId(document) {
	if (!document) return document;
	const { _id, ...rest } = document;
	return { ...rest, mongoId: _id?.toString?.() };
}

function stripMany(documents) {
	return documents.map(stripMongoId);
}

function publicUserName(user) {
	return user?.displayName || user?.username || 'VibeMatch User';
}

function validationError(message) {
	const issue = new Error(message);
	issue.status = 400;
	return issue;
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

export async function getWishlistIds(userId = DEMO_USER_ID) {
	const wishlist = await collection('wishlistItems');
	const items = await wishlist.find({ userId }).sort({ createdAt: -1 }).toArray();
	return items.map((item) => item.activityId);
}

export async function getWishlistActivities(userId = DEMO_USER_ID) {
	const ids = await getWishlistIds(userId);
	if (!ids.length) return [];
	const activities = await collection('activities');
	return stripMany(await activities.find({ id: { $in: ids } }).toArray());
}

export async function addWishlistItem(activityId, userId = DEMO_USER_ID) {
	await requireActivity(activityId);
	const wishlist = await collection('wishlistItems');
	await wishlist.updateOne(
		{ userId, activityId },
		{ $setOnInsert: { userId, activityId, createdAt: new Date().toISOString() } },
		{ upsert: true }
	);
	return getWishlistIds(userId);
}

export async function removeWishlistItem(activityId, userId = DEMO_USER_ID) {
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

export async function addUserReview({ activityId, rating, comment, visitWith, visitDate }, userId = DEMO_USER_ID) {
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

export async function getPlannedActivities(userId = DEMO_USER_ID) {
	const planned = await collection('plannedActivities');
	const items = stripMany(await planned.find({ userId }).sort({ date: 1, time: 1 }).toArray());
	const ids = [...new Set(items.map((item) => item.activityId))];
	const activities = await collection('activities');
	const activityMap = new Map((await activities.find({ id: { $in: ids } }).toArray()).map((item) => [item.id, stripMongoId(item)]));
	return items.map((item) => ({ ...item, activity: activityMap.get(item.activityId) })).filter((item) => item.activity);
}

export async function addPlannedActivity(activityId, details, userId = DEMO_USER_ID) {
	await requireActivity(activityId);
	const planned = await collection('plannedActivities');
	const item = {
		id: `planned-${Date.now()}`,
		userId,
		activityId,
		date: details.date,
		time: details.time,
		location: details.location,
		notes: details.notes || '',
		createdAt: new Date().toISOString()
	};
	await planned.insertOne(item);
	return stripMongoId(item);
}

export async function getHistoryItems(userId = DEMO_USER_ID) {
	const history = await collection('historyItems');
	const items = stripMany(await history.find({ userId }).sort({ date: -1 }).toArray());
	const ids = [...new Set(items.map((item) => item.activityId))];
	const activities = await collection('activities');
	const activityMap = new Map((await activities.find({ id: { $in: ids } }).toArray()).map((item) => [item.id, stripMongoId(item)]));
	return items.map((item) => ({ ...item, activity: activityMap.get(item.activityId) })).filter((item) => item.activity);
}

export async function getCommunityPosts() {
	const posts = await collection('communityPosts');
	const items = stripMany(await posts.find({}).sort({ createdAt: -1 }).toArray());
	const ids = [...new Set(items.map((item) => item.activityId))];
	const activities = await collection('activities');
	const activityMap = new Map((await activities.find({ id: { $in: ids } }).toArray()).map((item) => [item.id, stripMongoId(item)]));
	return items.map((item) => ({ ...item, activity: activityMap.get(item.activityId) }));
}

export async function addCommunityPost({ activityId, text, visibility = 'Öffentlich' }, userId = DEMO_USER_ID) {
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

export async function getProfile(userId = DEMO_USER_ID) {
	const users = await collection('users');
	const profiles = await collection('profiles');
	const user = stripMongoId(await users.findOne({ id: userId }));
	const legacyProfile = stripMongoId(await profiles.findOne({ userId }));
	const preferences = user?.preferences || {};
	const profile = user
		? {
				userId: user.id,
				username: user.username,
				email: user.email,
				name: user.displayName,
				displayName: user.displayName,
				location: user.location,
				memberSince: user.memberSince,
				avatar: user.avatar,
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
	const wishlistIds = await getWishlistIds(userId);
	const planned = await getPlannedActivities(userId);
	const history = await getHistoryItems(userId);
	const average =
		history.length > 0
			? Math.round((history.reduce((sum, item) => sum + Number(item.rating), 0) / history.length) * 10) / 10
			: 0;

	return {
		...profile,
		stats: [
			{ label: 'Geplante Dates', value: String(planned.length) },
			{ label: 'Gespeicherte Ideen', value: String(wishlistIds.length) },
			{ label: 'Vergangene Aktivitäten', value: String(history.length) },
			{ label: 'Durchschnittsbewertung', value: average ? String(average) : '-' }
		]
	};
}

export async function updateProfile(userId = DEMO_USER_ID, input = {}) {
	const users = await collection('users');
	const currentUser = await users.findOne({ id: userId });
	if (!currentUser) throw validationError('Profil wurde nicht gefunden.');

	const displayName = String(input.displayName || input.name || '').trim();
	const username = normalizeUsername(input.username || currentUser.username);
	const email = normalizeEmail(input.email || currentUser.email);
	const location = String(input.location || '').trim();
	const avatar = String(input.avatar || '').trim();
	const bio = String(input.bio || '').trim();
	const preferredCity = String(input.preferredCity || location || '').trim();
	const favoriteCategories = parseFavoriteCategories(input.favoriteCategories);

	if (displayName.length < 2 || displayName.length > 80) throw validationError('Der Anzeigename muss 2 bis 80 Zeichen lang sein.');
	if (!/^[a-z0-9._-]{3,30}$/.test(username)) throw validationError('Der Benutzername muss 3 bis 30 Zeichen lang sein und darf Buchstaben, Zahlen, Punkt, Unterstrich oder Bindestrich enthalten.');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw validationError('Bitte gib eine gültige E-Mail-Adresse ein.');
	if (location.length < 2 || location.length > 80) throw validationError('Der Ort muss 2 bis 80 Zeichen lang sein.');
	if (!isValidAvatar(avatar)) throw validationError('Avatar muss ein kurzes Kürzel oder eine gültige http/https-URL sein.');
	if (bio.length > 240) throw validationError('Die Kurzbeschreibung darf maximal 240 Zeichen lang sein.');

	const usernameOwner = await users.findOne({ username });
	if (usernameOwner && usernameOwner.id !== userId) throw validationError('Dieser Benutzername ist bereits vergeben.');

	const update = {
		username,
		email,
		displayName,
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

export async function updateNotificationSettings(userId = DEMO_USER_ID, input = {}) {
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

export async function updatePassword(userId = DEMO_USER_ID, { currentPassword = '', newPassword = '', confirmPassword = '' } = {}) {
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
