// Svelte
import { dev } from '$app/environment';

// Services
import { getUserFromDatabase } from '../../user/build/getUserFromDatabase';

export async function existingSpotifyUser() {
	try {
		const getProfileResponse = await fetch('/api/spotify/user/get-profile', {
			method: 'POST'
		});

		const parsedGetProfile = await getProfileResponse.json();

		if (!parsedGetProfile.email) throw new Error(parsedGetProfile.message);

		const getUserInfoFromSpotify = await getUserFromDatabase(parsedGetProfile.email);

		if (getUserInfoFromSpotify === undefined) {
			return {
				existingUser: false,
				infoToCreateUser: parsedGetProfile
			};
		}

		return getUserInfoFromSpotify;
	} catch (error) {
		if (dev) {
			console.error(
				'Spotify existingSpotifyUser error:',
				error instanceof Error ? error.message : error
			);
		}

		return undefined;
	}
}
