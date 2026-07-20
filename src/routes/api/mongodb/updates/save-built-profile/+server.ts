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
		const { id, builtUser } = await request.json();

		if (!id || !builtUser) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400
			});
		}

		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection<UserInfo>('users');

		await users?.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					trackOfTheMoment: builtUser.track,
					artistOfTheMoment: builtUser.artist,
					profileVisibility: {
						visibility: builtUser.profileVisibility,
					}
				}
			}
		);

		return new Response(
			JSON.stringify({
				builtUser: {
					trackOfTheMoment: builtUser.track,
					artistOfTheMoment: builtUser.artist,
					profileVisibility: {
						visibility: builtUser.profileVisibility,
					}
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
