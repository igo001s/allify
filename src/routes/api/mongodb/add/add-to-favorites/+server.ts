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
		const { idToSave, id, name, image, spotifyConnected, deezerConnected } = await request.json();

		if (!idToSave || !id || !name || !image) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400
			});
		}

		if (idToSave === id) {
			return new Response(JSON.stringify({ error: 'Cannot add yourself to favorites' }), {
				status: 400
			});
		}

		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection<UserInfo>('users');

		await users?.updateOne(
			{ _id: new ObjectId(idToSave) },
			{
				$push: {
					favorites: {
						_id: new ObjectId(id),
						name,
						image,
						spotifyConnected: spotifyConnected,
						deezerConnected: deezerConnected
					}
				}
			}
		);

		return new Response(
			JSON.stringify({
				addedFavorite: {
					_id: id,
					name,
					image,
					spotifyConnected: spotifyConnected,
					deezerConnected: deezerConnected
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
