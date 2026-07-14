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
			status: 403,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { tickets, email } = await request.json();

	if (!tickets || !email) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
	}

	if (tickets === 0) {
		return new Response(JSON.stringify({ error: 'No tickets available' }), { status: 400 });
	}

	try {
		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection('users');

		await users?.updateOne(
			{ email },
			{
				$set: {
					tickets: tickets - 1
				}
			}
		);

		return new Response(
			JSON.stringify({
				tickets: tickets - 1
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
