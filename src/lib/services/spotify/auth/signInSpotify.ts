// Svelte
import { dev } from '$app/environment';

export function signInSpotify() {
	try {
		window.location.href = `/api/spotify/auth/login`;

		return;
	} catch (error) {
		if (dev) {
			console.error('Spotify sign-in error:', error);
		}

		return;
	}
}
