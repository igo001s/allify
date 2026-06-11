// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403
		});
	}

	try {
		let token = cookies.get('spotify_access_token');

		if (!token) {
			return new Response(JSON.stringify({ error: 'No Spotify access token found' }), {
				status: 401
			});
		}

		let response = await fetch('https://api.spotify.com/v1/me', {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (response.status === 401 && cookies.get('spotify_refresh_token')) {
			await fetch('/api/spotify/auth/refresh', { method: 'POST' });

			token = cookies.get('spotify_access_token');

			response = await fetch('https://api.spotify.com/v1/me', {
				headers: { Authorization: `Bearer ${token}` }
			});
		}

		if (!response.ok) {
			return new Response(JSON.stringify({ error: 'Spotify error - failed to fetch profile' }), {
				status: response.status
			});
		}

		const data = await response.json();

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
	}
};
