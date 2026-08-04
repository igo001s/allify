// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB } from '$lib/server/mongodb';

// Utils
import { nextFreeUpdateTime } from '$lib/utils/nextFreeUpdateTime';

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

	const { id, trackOfTheMoment, freeUpdateIsAvailable, nextFreeUpdate } = await request.json();

	if (!id || !trackOfTheMoment) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), {
			status: 400
		});
	}

	try {
		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection('users');

		await users?.updateOne(
			{
				_id: new ObjectId(id)
			},
			{
				$set: {
					trackOfTheMoment: {
						track: trackOfTheMoment,
						nextFreeUpdate: freeUpdateIsAvailable ? nextFreeUpdateTime() : nextFreeUpdate
					}
				}
			}
		);

		return new Response(
			JSON.stringify({
				trackOfTheMoment: {
					track: trackOfTheMoment,
					nextFreeUpdate: freeUpdateIsAvailable ? nextFreeUpdateTime() : nextFreeUpdate
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
