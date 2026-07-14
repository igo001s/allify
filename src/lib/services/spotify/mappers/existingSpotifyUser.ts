// Svelte
import { dev } from '$app/environment';

// Services
import { getUserFromDatabase } from '../../user/build/getUserFromDatabase';

export async function existingSpotifyUser() {
	try {
		const response = await fetch('/api/spotify/user/get-profile', {
			method: 'POST'
		});

		const data = await response.json();

		if (!data.email) throw new Error('No email from Spotify');

		const getUserInfoFromSpotify = await getUserFromDatabase(data.email);

		if (!getUserInfoFromSpotify.userInfoFromMongoDB) {
			return {
				existingUser: false,
				infoToCreateUser: data
			};
		}

		return getUserInfoFromSpotify.userInfoFromMongoDB;
	} catch (error) {
		if (dev) {
			console.error(
				'Spotify existingSpotifyUser error:',
				error
			);
		}

		return undefined;
	}
}
