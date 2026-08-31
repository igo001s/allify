// Svelte
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '$env/static/private';

export const GET: RequestHandler = async ({ cookies }) => {
	const scope = 'user-read-email user-read-private user-top-read user-library-read';
	const state = crypto.randomUUID();

	cookies.set('spotify_state', state, {
		httpOnly: true,
		secure: true,
		path: '/',
		maxAge: 60 * 5
	});

	const url =
		'https://accounts.spotify.com/authorize?' +
		new URLSearchParams({
			response_type: 'code',
			client_id: SPOTIFY_CLIENT_ID,
			scope,
			redirect_uri: SPOTIFY_REDIRECT_URI,
			state
		});

	throw redirect(302, url);
};
