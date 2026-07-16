// Svelte
import { dev } from '$app/environment';

// Services
import { createUser } from './createUser';
import { sendEmail } from '../../email/sendEmail';
import { existingSpotifyUser } from '../../spotify/mappers/existingSpotifyUser';
import { buildUserFromSpotify } from '../../spotify/mappers/buildUserFromSpotify';

// Email templates
import { welcomeToAllifyTemplate } from '$lib/emails/templates/welcomeToAllifyTemaplate';

export async function fetchUserInfo(emailMessage: string) {
	try {
		const userFromSpotify = await existingSpotifyUser();

		if (userFromSpotify.existingUser === false) {
			const builtUser = await buildUserFromSpotify(userFromSpotify.infoToCreateUser);

			if (builtUser !== undefined) {
				const createUserResult = await createUser(
					builtUser.name,
					builtUser.email,
					'spotify',
					builtUser
				);

				sendEmail(
					emailMessage,
					'igorgabsprofissional@gmail.com',
					welcomeToAllifyTemplate(
						createUserResult.createdUser.connectedStreamings.spotify.name,
						'Spotify'
					)
				);

				return createUserResult.createdUser;
			} else {
				return undefined;
			}
		} else {
			return userFromSpotify;
		}
	} catch (error) {
		if (dev) {
			console.error('User fetchUserInfo error:', error);
		}

		return undefined;
	}
}
