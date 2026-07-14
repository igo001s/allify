// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB, disconnectFromMongoDB } from '$lib/server/mongodb';

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
		const { name, email, streaming, streamingData } = await request.json();

		if (!name || !email || !streaming || !streamingData) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection('users');

		const existingUser = await users?.findOne({ email: email });

		if (existingUser) {
			return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
		}

		const user = {
			name: name,
			email: email,
			tickets: 5,
			profileVisibility: 'public',
			primaryStreaming: streaming,
			connectedStreamings: { [streaming]: streamingData }
		};

		const result = await users?.insertOne({
			...user,
			createdAt: new Date()
		});

		return new Response(
			JSON.stringify({
				createdUser: {
					...user,
					_id: result?.insertedId
				}
			}),
			{ status: 201 }
		);
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500
		});
	} finally {
		await disconnectFromMongoDB();
	}
};
