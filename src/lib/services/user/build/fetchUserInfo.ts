// Svelte
import { dev } from '$app/environment';
import { get } from 'svelte/store';

// Stores
import { translationsStore } from '$lib/stores/translations.store';

// Services
import { createUser } from '$lib/services/user/build/createUser';
import { sendEmail } from '$lib/services/email/sendEmail';
import { existingSpotifyUser } from '$lib/services/spotify/mappers/existingSpotifyUser';
import { buildUserFromSpotify } from '$lib/services/spotify/mappers/buildUserFromSpotify';

// Email templates
import { welcomeToAllifyTemplate } from '$lib/templates/email/welcomeToAllifyTemplate';

export async function fetchUserInfo() {
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
						get(translationsStore).templateEmail.welcomeToAllifySubject,
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
