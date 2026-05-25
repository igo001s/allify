// Svelte
import { get } from 'svelte/store';

// Services
import { logoutSpotify } from '$lib/services/spotify/auth/logoutSpotify';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';

export function logoutWrapper(
	streaming: 'spotify' | 'deezer',
	spotifyConnected: boolean,
	deezerConnected: boolean
) {
	const user = get(userInfo);

	if (!user) return;

	if (streaming === 'spotify' && spotifyConnected) {
		userInfo.set({
			...user,
			connectedStreamings: {
				...user.connectedStreamings,
				spotify: undefined
			}
		});

		logoutSpotify();
	}

	if (streaming === 'deezer' && deezerConnected) {
		userInfo.set({
			...user,
			connectedStreamings: {
				...user.connectedStreamings,
				deezer: undefined
			}
		});

		// logoutDeezer();
	}
}
