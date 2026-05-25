// Svelte
import { get } from 'svelte/store';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';
import { translationsStore } from '$lib/stores/translations.store';

// Services
import { createUser } from './createUser';
import { sendEmail } from '../email/sendEmail';
import { existingSpotifyUser } from '../spotify/mappers/existingSpotifyUser';
import { buildUserFromSpotify } from '../spotify/mappers/buildUserFromSpotify';

// Email templates
import { welcomeToAllifyTemplate } from '$lib/emails/templates/welcomeToAllifyTemaplate';

export async function fetchUserInfo() {
	try {
		const userFromSpotify = await existingSpotifyUser();

		if (userFromSpotify.existingUser === false) {
			const builtUser = await buildUserFromSpotify(userFromSpotify.infoToCreateUser);

			if (builtUser !== undefined) {
				const createUserResult = await createUser(builtUser.email, 'spotify', builtUser);

				userInfo.set(createUserResult.createdUser);

				const $translationsStore = get(translationsStore);

				sendEmail(
					$translationsStore.templateEmail.welcomeToAllifySubject,
					'igorgabsprofissional@gmail.com',
					welcomeToAllifyTemplate(
						createUserResult.createdUser.connectedStreamings.spotify.name,
						'Spotify'
					)
				);
			} else {
				return userInfo.set(undefined);
			}
		} else {
			return userInfo.set(userFromSpotify);
		}
	} catch {
		return userInfo.set(undefined);
	}
}
