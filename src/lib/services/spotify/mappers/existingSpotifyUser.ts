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

		if (!parsedGetProfile.email) throw new Error('No email from Spotify');

		const getUserInfoFromSpotify = await getUserFromDatabase(parsedGetProfile.email);

		if (getUserInfoFromSpotify === undefined) {
			return {
				existingUser: false,
				infoToCreateUser: parsedGetProfile
			};
		}

		return getUserInfoFromSpotify.userInfoFromMongoDB;
	} catch (error) {
		if (dev) {
			console.error('Spotify existingSpotifyUser error:', error);
		}

		return undefined;
	}
}
