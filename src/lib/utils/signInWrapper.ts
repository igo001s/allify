// Services
import { signInSpotify } from '$lib/services/spotify/auth/signInSpotify';

// Stores
import { loadingAfterConnectionStore } from '$lib/stores/loadingAfterConnection.store';

export function signInWrapper(
	streaming: 'spotify' | 'deezer',
	spotifyConnected: boolean,
	deezerConnected: boolean
) {
	if (streaming === 'spotify') {
		if (!spotifyConnected) {
			signInSpotify();
		}
	} else if (streaming === 'deezer') {
		if (!deezerConnected) {
			// signInDeezer(); // Implement this function when the deezer connection is ready
		}
	}

	loadingAfterConnectionStore.set({
		loading: true,
		streamingPlatform: streaming
	});

	return;
}
