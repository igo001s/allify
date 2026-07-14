// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB, disconnectFromMongoDB } from '$lib/server/mongodb';

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

	const { email, limit, updatedAt, mostListenedTrack, mostListenedTracks } = await request.json();

	if (!email || !limit || !updatedAt || !mostListenedTrack || !mostListenedTracks) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), {
			status: 400
		});
	}

	try {
		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection('users');

		await users?.updateOne(
			{ email },
			{
				$set: {
					'connectedStreamings.spotify.mostListenedTracks.tracksLimit': limit,
					'connectedStreamings.spotify.mostListenedTracks.updatedAt': updatedAt,
					'connectedStreamings.spotify.mostListenedTracks.mostListenedTrackItem': mostListenedTrack,
					'connectedStreamings.spotify.mostListenedTracks.mostListenedTracksItems':
						mostListenedTracks
				}
			}
		);

		return new Response(
			JSON.stringify({
				limit,
				updatedAt,
				mostListenedTrack,
				mostListenedTracks
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500
		});
	} finally {
		await disconnectFromMongoDB();
	}
};
