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
		const reqSavedPlaylists = await fetch(`https://api.spotify.com/v1/me/playlists`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		if (!reqSavedPlaylists.ok) {
			const err = await reqSavedPlaylists.text();
			return new Response(JSON.stringify({ error: err }), { status: reqSavedPlaylists.status });
		}

		const savedPlaylistsData = await reqSavedPlaylists.json();

		return new Response(JSON.stringify(savedPlaylistsData.items), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch saved playlists' }), {
			status: 500
		});
	}
};
