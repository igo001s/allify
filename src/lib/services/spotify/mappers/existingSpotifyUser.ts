import { getUserFromDatabase } from '../../user/getUserFromDatabase';

export async function existingSpotifyUser() {
	const response = await fetch('/api/spotify/user/get-profile', {
		credentials: 'include'
	});

	const data = await response.json();

	if (!data.email) throw new Error('No email from Spotify');

	const getUserInfoFromSpotify = await getUserFromDatabase(data.email);

	if (!getUserInfoFromSpotify.success) {
		return {
			existingUser: false,
			infoToCreateUser: data
		};
	}

	return getUserInfoFromSpotify.userInfoFromMongoDB;
}
