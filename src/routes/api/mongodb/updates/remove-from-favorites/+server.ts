// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectDB } from '$lib/server/mongodb';

// Types
import type { UserInfo } from '$lib/types/UserInfo.type';

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
		const { emailFromRemove, email } = await request.json();

		if (!emailFromRemove || !email) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400
			});
		}

		const client = await connectDB();
		const db = client.db(MONGO_DB);
		const users = db.collection<UserInfo>('users');

		const result = await users.updateOne(
			{ email: emailFromRemove },
			{
				$pull: {
					favorites: {
						email
					}
				}
			}
		);

		if (result.modifiedCount === 0) {
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
					email
				}
			}),
			{
				status: 200
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: (error as Error).message
			}),
			{
				status: 500
			}
		);
	}
};
