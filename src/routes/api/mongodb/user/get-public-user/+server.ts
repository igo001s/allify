// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB, disconnectFromMongoDB } from '$lib/server/mongodb';

// MongoDB
import { ObjectId } from 'mongodb';

// Environment variables
import { MONGO_DB, ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403
		});
	}

	try {
		const body = await request.json();

		const { id } = body;

		if (!id) {
			return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
		}

		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection('users');

		const userFoundedById = await users?.findOne({ _id: new ObjectId(id) });

		if (!userFoundedById) {
			return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
		}

		return new Response(
			JSON.stringify({
				userFoundedById
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500
		});
	} finally {
		await disconnectFromMongoDB();
	}
};
