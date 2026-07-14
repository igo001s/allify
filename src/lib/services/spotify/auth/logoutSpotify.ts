// Svelte
import { dev } from '$app/environment';

export async function logoutSpotify() {
	try {
		await fetch('/api/spotify/auth/logout', {
			method: 'POST',
			credentials: 'include'
		});

		return;
	} catch (error) {
		if (dev) {
			console.error(
				'Spotify logout error:',
				error
			);
		}

		return;
	}
}
