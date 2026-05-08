import { dev } from '$app/environment';
import { collection } from './db.js';
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

export const SESSION_COOKIE = 'vm_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const DEMO_USERNAME = 'demo';
const DEMO_PASSWORD = 'demo123';
const DEMO_USER_ID = 'demo-user';

export function sanitizeUser(user) {
	if (!user) return null;
	const { _id, passwordHash, ...safeUser } = user;
	return {
		...safeUser,
		mongoId: _id?.toString?.()
	};
}

export async function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const derivedKey = await scrypt(password, salt, 64);
	return `scrypt$${salt}$${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password, passwordHash) {
	const [algorithm, salt, key] = passwordHash?.split('$') ?? [];
	if (algorithm !== 'scrypt' || !salt || !key) return false;

	const storedKey = Buffer.from(key, 'hex');
	const derivedKey = await scrypt(password, salt, storedKey.length);
	return storedKey.length === derivedKey.length && timingSafeEqual(storedKey, derivedKey);
}

function hashSessionToken(token) {
	return createHash('sha256').update(token).digest('hex');
}

export async function getUserByUsername(username) {
	const users = await collection('users');
	return users.findOne({ username: username.trim().toLowerCase() });
}

async function createOrRepairDemoUser() {
	const users = await collection('users');
	const now = new Date().toISOString();
	const demoUser = {
		id: DEMO_USER_ID,
		username: DEMO_USERNAME,
		email: 'demo@vibematch.local',
		passwordHash: await hashPassword(DEMO_PASSWORD),
		displayName: 'Jan',
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
		updatedAt: now
	};

	await users.updateOne(
		{ id: DEMO_USER_ID },
		{
			$set: {
				passwordHash: demoUser.passwordHash,
				updatedAt: now
			},
			$setOnInsert: { ...demoUser, createdAt: now }
		},
		{ upsert: true }
	);
	return users.findOne({ id: DEMO_USER_ID });
}

export async function getUserById(userId) {
	const users = await collection('users');
	return sanitizeUser(await users.findOne({ id: userId }));
}

export async function authenticateUser(username, password) {
	const normalizedUsername = username.trim().toLowerCase();
	const normalizedPassword = password.trim();
	let user = await getUserByUsername(normalizedUsername);
	if (!user && normalizedUsername === DEMO_USERNAME && normalizedPassword === DEMO_PASSWORD) {
		user = await createOrRepairDemoUser();
	}
	if (!user) return null;

	let passwordValid = await verifyPassword(normalizedPassword, user.passwordHash);
	if (!passwordValid && normalizedUsername === DEMO_USERNAME && normalizedPassword === DEMO_PASSWORD) {
		user = await createOrRepairDemoUser();
		passwordValid = await verifyPassword(normalizedPassword, user.passwordHash);
	}
	return passwordValid ? sanitizeUser(user) : null;
}

export async function createSession(userId) {
	const token = randomBytes(32).toString('hex');
	const now = new Date();
	const expiresAt = new Date(now.getTime() + SESSION_MAX_AGE * 1000);
	const sessions = await collection('sessions');

	await sessions.insertOne({
		id: `session-${Date.now()}-${randomBytes(8).toString('hex')}`,
		userId,
		tokenHash: hashSessionToken(token),
		createdAt: now.toISOString(),
		expiresAt: expiresAt.toISOString()
	});

	return token;
}

export async function getUserBySessionToken(token) {
	if (!token) return null;

	const sessions = await collection('sessions');
	const tokenHash = hashSessionToken(token);
	const session = await sessions.findOne({ tokenHash });

	if (!session) return null;
	if (new Date(session.expiresAt).getTime() <= Date.now()) {
		await sessions.deleteOne({ tokenHash });
		return null;
	}

	return getUserById(session.userId);
}

export async function deleteSession(token) {
	if (!token) return;
	const sessions = await collection('sessions');
	await sessions.deleteOne({ tokenHash: hashSessionToken(token) });
}

export function setSessionCookie(cookies, token) {
	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		maxAge: SESSION_MAX_AGE
	});
}

export function clearSessionCookie(cookies) {
	cookies.delete(SESSION_COOKIE, { path: '/' });
}
