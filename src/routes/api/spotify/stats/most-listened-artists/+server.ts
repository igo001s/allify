// Types
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request, cookies }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403
		});
	}

	try {
		const { limit } = await request.json();

		const token = cookies.get('spotify_access_token');

		if (!token) {
			return new Response(JSON.stringify({ error: 'No Spotify access token found' }), {
				status: 401
			});
		}

		const mostListenedArtistsResponse = await fetch(
			`https://api.spotify.com/v1/me/top/artists?offset=0&limit=${limit}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		if (!mostListenedArtistsResponse.ok) {
			return new Response(
				JSON.stringify({ error: 'Failed to fetch Spotify data - most listened artists' }),
				{ status: mostListenedArtistsResponse.status }
			);
		}

		const parsedMostListenedArtistsResponse = await mostListenedArtistsResponse.json();

		return new Response(JSON.stringify(parsedMostListenedArtistsResponse.items), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500
		});
	}
};
