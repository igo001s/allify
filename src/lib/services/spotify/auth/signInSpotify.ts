// Svelte
import { dev } from '$app/env';

export function signInSpotify() {
	try {
		window.location.href = `/api/spotify/auth/login`;
	} catch (error) {
		if (dev) {
			console.error('Spotify sign-in error:', error instanceof Error ? error.message : error);
		}
	}

	return;
}
