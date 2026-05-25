// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request, cookies }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const { locale, tracksLimit } = await request.json();

		const token = cookies.get('spotify_access_token');

		if (!token) {
			return new Response(JSON.stringify({ error: 'No Spotify access token found' }), {
				status: 401
			});
		}

		const response = await fetch(
			`https://api.spotify.com/v1/me/top/tracks?offset=0&limit=${tracksLimit}&locale=${locale}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		if (!response.ok) {
			const err = await response.text();
			return new Response(JSON.stringify({ error: err }), { status: response.status });
		}

		const data = await response.json();

		return new Response(JSON.stringify(data.items), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch Spotify access token' }), {
			status: 500
		});
	}
};
