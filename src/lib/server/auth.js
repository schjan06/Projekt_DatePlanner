import { dev } from '$app/environment';
import { collection } from './db.js';
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

export const SESSION_COOKIE = 'vm_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

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

function validationError(message, fieldErrors = {}) {
	const issue = new Error(message);
	issue.status = 400;
	issue.fieldErrors = fieldErrors;
	return issue;
}

function normalizeUsername(value = '') {
	return String(value).trim().toLowerCase();
}

function normalizeEmail(value = '') {
	return String(value).trim().toLowerCase();
}

function initialsFromName(value = '') {
	const parts = String(value || 'VM')
		.trim()
		.split(/\s+/)
		.filter(Boolean);
	return (parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0]?.slice(0, 2) || 'VM').toUpperCase();
}

function validateRegistrationInput(input = {}) {
	const fieldErrors = {};
	const displayName = String(input.displayName || '').trim();
	const username = normalizeUsername(input.username);
	const email = normalizeEmail(input.email);
	const password = String(input.password || '');
	const confirmPassword = String(input.confirmPassword || '');

	if (displayName.length < 2 || displayName.length > 80) fieldErrors.displayName = 'Der Anzeigename muss 2 bis 80 Zeichen lang sein.';
	if (!/^[a-z0-9._-]{3,30}$/.test(username)) {
		fieldErrors.username = 'Der Benutzername muss 3 bis 30 Zeichen lang sein und darf Buchstaben, Zahlen, Punkt, Unterstrich oder Bindestrich enthalten.';
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.';
	if (password.length < 6) fieldErrors.password = 'Das Passwort muss mindestens 6 Zeichen lang sein.';
	if (password !== confirmPassword) fieldErrors.confirmPassword = 'Die Passwörter stimmen nicht überein.';

	if (Object.keys(fieldErrors).length) throw validationError('Bitte prüfe die markierten Felder.', fieldErrors);
	return { displayName, username, email, password };
}

export async function getUserByUsername(username) {
	const users = await collection('users');
	return users.findOne({ username: normalizeUsername(username) });
}

async function getUserByLoginIdentifier(identifier) {
	const users = await collection('users');
	const username = normalizeUsername(identifier);
	const email = normalizeEmail(identifier);
	return users.findOne({ $or: [{ username }, { email }] });
}

export async function getUserById(userId) {
	const users = await collection('users');
	return sanitizeUser(await users.findOne({ id: userId }));
}

export async function authenticateUser(usernameOrEmail, password) {
	const normalizedPassword = String(password || '').trim();
	const user = await getUserByLoginIdentifier(usernameOrEmail);
	if (!user) return null;

	const passwordValid = await verifyPassword(normalizedPassword, user.passwordHash);
	if (!passwordValid) return null;
	return sanitizeUser(user);
}

export async function createUserAccount(input = {}) {
	const values = validateRegistrationInput(input);
	const users = await collection('users');
	const existingUsername = await users.findOne({ username: values.username });
	const existingEmail = await users.findOne({ email: values.email });
	const fieldErrors = {};

	if (existingUsername) fieldErrors.username = 'Dieser Benutzername ist bereits vergeben.';
	if (existingEmail) fieldErrors.email = 'Diese E-Mail-Adresse ist bereits registriert.';
	if (Object.keys(fieldErrors).length) throw validationError('Bitte prüfe die markierten Felder.', fieldErrors);

	const now = new Date().toISOString();
	const user = {
		id: `user-${Date.now()}-${randomBytes(6).toString('hex')}`,
		username: values.username,
		email: values.email,
		passwordHash: await hashPassword(values.password),
		displayName: values.displayName,
		location: '',
		avatar: initialsFromName(values.displayName),
		memberSince: new Intl.DateTimeFormat('de-CH', { month: 'long', year: 'numeric' }).format(new Date()),
		preferences: {
			preferredCity: '',
			favoriteCategories: [],
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

	await users.insertOne(user);
	return sanitizeUser(user);
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
