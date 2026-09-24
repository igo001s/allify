// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB } from '$lib/server/mongodb';
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

	const {
		id,
		limit,
		fourWeeks,
		sixMonths,
		oneYear,
		uniqueArtists,
		artistWhoWereWithYou,
		freeUpdateIsAvailable,
		nextFreeUpdate
	} = await request.json();

	if (!id || !limit || !fourWeeks || !sixMonths || !oneYear || !uniqueArtists) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), {
			status: 400
		});
	}

	try {
		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection('users');

		await users?.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					'connectedStreamings.spotify.mostListenedArtists.artistsLimit': limit,
					'connectedStreamings.spotify.mostListenedArtists.fourWeeks': fourWeeks,
					'connectedStreamings.spotify.mostListenedArtists.sixMonths': sixMonths,
					'connectedStreamings.spotify.mostListenedArtists.oneYear': oneYear,
					'connectedStreamings.spotify.mostListenedArtists.uniqueArtists': uniqueArtists,
					'connectedStreamings.spotify.mostListenedArtists.nextFreeUpdate': freeUpdateIsAvailable
						? nextFreeUpdateTime()
						: nextFreeUpdate,
					'artists.artistsWhoWereWithYou': artistWhoWereWithYou ? artistWhoWereWithYou : []
				}
			}
		);

		return new Response(
			JSON.stringify({
				limit,
				fourWeeks,
				sixMonths,
				oneYear,
				uniqueArtists,
				artistWhoWereWithYou,
				nextFreeUpdate: freeUpdateIsAvailable ? nextFreeUpdateTime() : nextFreeUpdate
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500
		});
	}
};
