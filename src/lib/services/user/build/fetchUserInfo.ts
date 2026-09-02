// Svelte
import { dev } from '$app/environment';
import { get } from 'svelte/store';

// Stores
import { translationsStore } from '$lib/stores/translations.store';

// Services
import { createUser } from './createUser';
import { sendEmail } from '../../email/sendEmail';
import { existingSpotifyUser } from '../../spotify/mappers/existingSpotifyUser';
import { buildUserFromSpotify } from '../../spotify/mappers/buildUserFromSpotify';

// Email templates
import { welcomeToAllifyTemplate } from '$lib/emails/templates/welcomeToAllifyTemaplate';

export async function fetchUserInfo() {
	try {
		const userFromSpotify = await existingSpotifyUser();
		const $translationsStore = get(translationsStore);

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
						$translationsStore.templateEmail.welcomeToAllifySubject,
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
