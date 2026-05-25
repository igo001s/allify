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
		const reqSavedAlbums = await fetch(`https://api.spotify.com/v1/me/albums`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		if (!reqSavedAlbums.ok) {
			const err = await reqSavedAlbums.text();
			return new Response(JSON.stringify({ error: err }), { status: reqSavedAlbums.status });
		}

		const savedAlbumsData = await reqSavedAlbums.json();

		return new Response(JSON.stringify(savedAlbumsData.items), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch saved albums' }), {
			status: 500
		});
	}
};
