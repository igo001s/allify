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

				if (createUserResult) {
					sendEmail(
						emailMessage,
						builtUser.email,
						welcomeToAllifyTemplate(createUserResult.connectedStreamings.spotify.name, 'Spotify')
					);

					return createUserResult;
				} else {
					return {
						error: true,
						errorType: 'userCreation'
					};
				}
			} else {
				return {
					error: true,
					errorType: 'fetchUserInfo'
				};
			}
		} else {
			return userFromSpotify;
		}
	} catch (error) {
		if (dev) {
			console.error('User fetchUserInfo error:', error instanceof Error ? error.message : error);
		}

		return {
			error: true,
			errorType: 'fetchUserInfo'
		};
	}
}
