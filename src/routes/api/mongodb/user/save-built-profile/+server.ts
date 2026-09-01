// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB } from '$lib/server/mongodb';

// Types
import type { UserInfo } from '$lib/types/UserInfo.type';

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
					tracks: {
						trackOfTheMoment: {
							track: builtUser.track,
							nextFreeUpdate: nextFreeUpdateTime()
						}
					},
					artists: {
						artistOfTheMoment: {
							artist: builtUser.artist,
							nextFreeUpdate: nextFreeUpdateTime()
						}
					},
					profileVisibility: {
						visibility: builtUser.profileVisibility
					}
				}
			}
		);

		return new Response(
			JSON.stringify({
				trackOfTheMoment: {
					track: builtUser.track,
					nextFreeUpdate: nextFreeUpdateTime()
				},
				artistOfTheMoment: {
					artist: builtUser.artist,
					nextFreeUpdate: nextFreeUpdateTime()
				},
				profileVisibility: {
					visibility: builtUser.profileVisibility
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
