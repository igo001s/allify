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
		const { emailToSave, email, name, image, spotifyConnected, deezerConnected } =
			await request.json();

		if (!emailToSave || !email || !name || !image) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400
			});
		}

		if (emailToSave === email) {
			return new Response(JSON.stringify({ error: 'Cannot add yourself to favorites' }), {
				status: 400
			});
		}

		const client = await connectDB();
		const db = client.db(MONGO_DB);
		const users = db.collection<UserInfo>('users');

		await users.updateOne(
			{ email: emailToSave },
			{
				$push: {
					favorites: {
						email,
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
					email,
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
				error: (error as Error).message
			}),
			{
				status: 500
			}
		);
	}
};
