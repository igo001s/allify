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

		let parsedMostListenedArtistsResponses: Record<string, any[]> = {};

		for (const timeRange of ['short_term', 'medium_term', 'long_term']) {
			const response = await fetch(
				`https://api.spotify.com/v1/me/top/artists?offset=0&limit=${limit}&time_range=${timeRange}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			if (!response.ok) {
				return new Response(
					JSON.stringify({ error: 'Failed to fetch Spotify data - most listened artists' }),
					{ status: response.status }
				);
			}

			const parsedMostListenedArtistsResponse = await response.json();

			parsedMostListenedArtistsResponses[timeRange] = parsedMostListenedArtistsResponse.items;
		}

		return new Response(JSON.stringify(parsedMostListenedArtistsResponses), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500
		});
	}
};
