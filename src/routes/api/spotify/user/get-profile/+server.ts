// Svelte
import { json } from '@sveltejs/kit';

export const GET = async ({ cookies, fetch }) => {
	let token = cookies.get('spotify_access_token');

	if (!token) {
		return json({ error: 'No access token' }, { status: 401 });
	}

	let res = await fetch('https://api.spotify.com/v1/me', {
		headers: { Authorization: `Bearer ${token}` }
	});

	if (res.status === 401 && cookies.get('spotify_refresh_token')) {
		await fetch('/api/spotify/auth/refresh', { method: 'POST' });

		token = cookies.get('spotify_access_token');

		res = await fetch('https://api.spotify.com/v1/me', {
			headers: { Authorization: `Bearer ${token}` }
		});
	}

	if (!res.ok) {
		return json({ error: 'Spotify error' }, { status: res.status });
	}

	const data = await res.json();

	return json(data);
};
