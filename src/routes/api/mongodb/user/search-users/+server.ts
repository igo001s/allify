// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectDB } from '$lib/server/mongodb';

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

		const { user } = body;

		if (!user) {
			return new Response(JSON.stringify({ error: 'User is required' }), { status: 400 });
		}

		const client = await connectDB();
		const db = client.db(MONGO_DB);
		const users = db.collection('users');

		const foundUsers = await users
			.find({
				name: {
					$regex: user,
					$options: 'i'
				}
			})
			.toArray();

		if (!foundUsers || foundUsers.length === 0) {
			return new Response(JSON.stringify({ error: 'Users not found' }), { status: 404 });
		}

		return new Response(
			JSON.stringify({
				users: foundUsers.map((user) => ({
					id: user._id,
					image: user.primaryStreaming === 'spotify' ? user.connectedStreamings.spotify.image : '',
					name: user.name,
					primaryStreaming: user.primaryStreaming
				}))
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), {
			status: 500
		});
	}
};
