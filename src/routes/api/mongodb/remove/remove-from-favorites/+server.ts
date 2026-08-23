// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB } from '$lib/server/mongodb';

// Types
import type { UserInfo } from '$lib/types/UserInfo.type';

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
		const { idToRemove, id } = await request.json();

		if (!idToRemove || !id) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400
			});
		}

		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection<UserInfo>('users');

		const result = await users?.updateOne(
			{ _id: new ObjectId(idToRemove) },
			{
				$pull: {
					favorites: {
						_id: new ObjectId(id)
					}
				}
			}
		);

		if (result?.modifiedCount === 0) {
			return new Response(
				JSON.stringify({
					error: 'Favorite not found'
				}),
				{
					status: 404
				}
			);
		}

		return new Response(
			JSON.stringify({
				removedFavorite: {
					_id: id
				}
			}),
			{
				status: 200
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error
			}),
			{
				status: 500
			}
		);
	}
};
