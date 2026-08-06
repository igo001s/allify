// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB } from '$lib/server/mongodb';

// Utils
import { nextFreeUpdateTime } from '$lib/utils/nextFreeUpdateTime';

// Environment variables
import { MONGO_DB, ALLIFY_URL } from '$env/static/private';
import { ObjectId } from 'mongodb';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403
		});
	}

	try {
		const { id, profileVisibility, nextFreeUpdate } = await request.json();

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
						nextFreeUpdate: nextFreeUpdate ? nextFreeUpdate : nextFreeUpdateTime()
					}
				}
			}
		);

		return new Response(
			JSON.stringify({
				profileVisibilityUpdated: {
					visibility: profileVisibility,
					nextFreeUpdate: nextFreeUpdate ? nextFreeUpdate : nextFreeUpdateTime()
				}
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500
		});
	}
};
