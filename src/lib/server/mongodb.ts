// Svelte
import { dev } from '$app/environment';

// mongoDB
import { MongoClient } from 'mongodb';

// Environment variables
import { MONGO_URI } from '$env/static/private';

const client = new MongoClient(MONGO_URI);

export async function connectToMongoDB() {
	try {
		await client.connect();

		return client;
	} catch (error) {
		if (dev) {
			console.error('Error connecting to MongoDB:', error);
		}
	}
}

export async function disconnectFromMongoDB() {
	await client.close();
}
