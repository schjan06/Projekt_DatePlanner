import { DB_URI } from '$env/static/private';
import { env } from '$env/dynamic/private';
import { MongoClient } from 'mongodb';

const DB_NAME = env.DB_NAME || 'vibematch';

let clientPromise;

export function getMongoClient() {
	if (!DB_URI) {
		throw new Error('DB_URI fehlt. Bitte in .env setzen.');
	}

	if (!clientPromise) {
		const client = new MongoClient(DB_URI, {
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 8000
		});
		clientPromise = client.connect();
	}

	return clientPromise;
}

export async function getDb() {
	const client = await getMongoClient();
	return client.db(DB_NAME);
}

export async function collection(name) {
	const db = await getDb();
	return db.collection(name);
}
