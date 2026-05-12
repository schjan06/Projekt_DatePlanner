import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { MongoClient } from 'mongodb';
import { randomBytes, scrypt as scryptCallback } from 'node:crypto';
import { promisify } from 'node:util';
import { activities } from '../src/lib/data/activities.js';
import { reviews } from '../src/lib/data/reviews.js';
import { plannedActivities } from '../src/lib/data/plannedActivities.js';
import { historyItems } from '../src/lib/data/history.js';
import { communityPosts } from '../src/lib/data/communityPosts.js';
import { profile } from '../src/lib/data/profile.js';

const DEMO_USER_ID = 'demo-user';
const scrypt = promisify(scryptCallback);

function loadEnv() {
	const envPath = resolve(process.cwd(), '.env');
	if (!existsSync(envPath)) return;

	const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const separator = trimmed.indexOf('=');
		if (separator === -1) continue;
		const key = trimmed.slice(0, separator).trim();
		const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
		if (!process.env[key]) process.env[key] = value;
	}
}

async function upsertMany(collection, documents, key = 'id') {
	for (const document of documents) {
		const filter = Array.isArray(key)
			? Object.fromEntries(key.map((field) => [field, document[field]]))
			: { [key]: document[key] };
		await collection.updateOne(filter, { $set: document }, { upsert: true });
	}
}

async function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const derivedKey = await scrypt(password, salt, 64);
	return `scrypt$${salt}$${derivedKey.toString('hex')}`;
}

loadEnv();

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME || 'vibematch';

if (!uri) {
	console.error('DB_URI fehlt. Bitte .env prüfen.');
	process.exit(1);
}

const client = new MongoClient(uri);

try {
	await client.connect();
	const db = client.db(dbName);

	await Promise.all([
		db.collection('activities').createIndex({ id: 1 }, { unique: true }),
		db.collection('activities').createIndex({ title: 'text', description: 'text', city: 'text', location: 'text' }),
		db.collection('reviews').createIndex({ id: 1 }, { unique: true }),
		db.collection('reviews').createIndex({ activityId: 1 }),
		db.collection('wishlistItems').createIndex({ userId: 1, activityId: 1 }, { unique: true }),
		db.collection('plannedActivities').createIndex({ id: 1 }, { unique: true }),
		db.collection('plannedActivities').createIndex({ userId: 1, date: 1 }),
		db.collection('historyItems').createIndex({ id: 1 }, { unique: true }),
		db.collection('historyItems').createIndex({ userId: 1, date: -1 }),
		db.collection('communityPosts').createIndex({ id: 1 }, { unique: true }),
		db.collection('profiles').createIndex({ userId: 1 }, { unique: true }),
		db.collection('users').createIndex({ id: 1 }, { unique: true }),
		db.collection('users').createIndex({ username: 1 }, { unique: true }),
		db.collection('users').createIndex({ email: 1 }, { unique: true }),
		db.collection('sessions').createIndex({ tokenHash: 1 }, { unique: true }),
		db.collection('sessions').createIndex({ expiresAt: 1 })
	]);

	const now = new Date().toISOString();
	const demoUser = {
		id: DEMO_USER_ID,
		username: 'demo',
		email: 'demo@vibematch.local',
		passwordHash: await hashPassword('demo123'),
		displayName: 'demo',
		location: 'St. Gallen',
		avatar: 'JA',
		memberSince: 'Mai 2026',
		bio: 'Plant gemeinsame Aktivitäten, sammelt Ideen und testet den VibeMatch-Prototyp.',
		preferences: {
			preferredCity: 'St. Gallen',
			favoriteCategories: ['Aktiv', 'Gesellig'],
			notifications: true,
			notificationSettings: {
				plannedActivityReminders: true,
				wishlistUpdates: false,
				communityUpdates: true,
				emailNotifications: false,
				pushNotifications: false
			}
		},
		stats: {},
		createdAt: now,
		updatedAt: now
	};

	await upsertMany(db.collection('activities'), activities);
	await upsertMany(db.collection('reviews'), reviews);
	await upsertMany(db.collection('plannedActivities'), plannedActivities);
	await upsertMany(db.collection('historyItems'), historyItems);
	await upsertMany(db.collection('communityPosts'), communityPosts);

	await db.collection('profiles').updateOne({ userId: profile.userId }, { $set: profile }, { upsert: true });
	await db.collection('users').updateOne({ id: demoUser.id }, { $set: demoUser }, { upsert: true });

	const defaultWishlist = ['sunset-picknick', 'keramik-workshop', 'street-food-tour', 'sternenhimmel'];
	await upsertMany(
		db.collection('wishlistItems'),
		defaultWishlist.map((activityId, index) => ({
			id: `wishlist-${index + 1}`,
			userId: DEMO_USER_ID,
			activityId,
			createdAt: new Date(Date.now() - index * 60000).toISOString()
		})),
		['userId', 'activityId']
	);

	const counts = await Promise.all(
		['activities', 'reviews', 'wishlistItems', 'plannedActivities', 'historyItems', 'communityPosts', 'profiles', 'users', 'sessions'].map(
			async (name) => [name, await db.collection(name).countDocuments()]
		)
	);

	console.log(`Seed abgeschlossen für Datenbank "${dbName}".`);
	for (const [name, count] of counts) {
		console.log(`${name}: ${count}`);
	}
} finally {
	await client.close();
}
