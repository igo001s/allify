// Svelte
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ cookies }) => {
	const refresh_token = cookies.get('spotify_refresh_token');

	if (!refresh_token) {
		return json({ error: 'No refresh token' }, { status: 401 });
	}

	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization:
				'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token
		})
	});

	const data = await res.json();

	cookies.set('spotify_access_token', data.access_token, {
		httpOnly: true,
		secure: true,
		path: '/',
		maxAge: data.expires_in
	});

	return json({ ok: true });
};
