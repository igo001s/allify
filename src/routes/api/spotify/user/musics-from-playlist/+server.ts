// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ cookies, request }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const token = cookies.get('spotify_access_token');
	const { playlistTracksHref } = await request.json();

	if (!token) {
		return new Response(JSON.stringify({ error: 'No Spotify access token found' }), {
			status: 401
		});
	}

	try {
		const response = await fetch(playlistTracksHref, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

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
		return new Response(JSON.stringify({ error: 'Failed to fetch musics from playlist' }), {
			status: 500
		});
	}
};
