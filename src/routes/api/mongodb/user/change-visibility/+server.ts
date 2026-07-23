// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB } from '$lib/server/mongodb';

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
		const { id, profileVisibility } = await request.json();

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
						updatedAt: new Date()
					}
				}
			}
		);

		return new Response(
			JSON.stringify({
				profileVisibilityUpdated: {
					visibility: profileVisibility,
					updatedAt: new Date()
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
