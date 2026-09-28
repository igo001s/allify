// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB } from '$lib/server/mongodb';

// Utils
import { nextUpdateTime } from '$lib/utils/nextUpdateTime';

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
		const { id, profileVisibility, updateIsAvailable, nextUpdate } = await request.json();

		if (!id || !profileVisibility) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection('users');

		users?.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					profileVisibility: {
						visibility: profileVisibility,
						nextUpdate: updateIsAvailable ? nextUpdateTime() : nextUpdate
					}
				}
			}
		);

		return new Response(
			JSON.stringify({
				visibility: profileVisibility,
				nextUpdate: updateIsAvailable ? nextUpdateTime() : nextUpdate
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500
		});
	}
};
