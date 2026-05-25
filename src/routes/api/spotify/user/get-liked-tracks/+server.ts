// Svelte
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('spotify_access_token');

	if (!token) {
		return new Response(JSON.stringify({ error: 'No Spotify access token found' }), {
			status: 401
		});
	}

	try {
		const reqSavedTracks = await fetch(`https://api.spotify.com/v1/me/tracks`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		if (!reqSavedTracks.ok) {
			const err = await reqSavedTracks.text();
			return new Response(JSON.stringify({ error: err }), { status: reqSavedTracks.status });
		}

		const savedTracksData = await reqSavedTracks.json();

		return new Response(JSON.stringify(savedTracksData.items), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch saved tracks' }), {
			status: 500
		});
	}
};
