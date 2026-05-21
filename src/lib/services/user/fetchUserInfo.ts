// Svelte
import { get } from 'svelte/store';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';
import { translationsStore } from '$lib/stores/translations.store';

// Services
import { userInfoFromSpotify } from './../spotify/fetchUserInfoFromSpotify';
import { initialUserInfoFromSpotify } from '../spotify/initialUserInfoFromSpotify';
import { getUser } from './getUser';
import { createUser } from './createUser';

// Email templates
import { welcomeToAllifyTemplate } from '$lib/emails/templates/WelcomeToAllifyTemaplate';

export async function fetchUserInfo() {
	try {
		const initialInfoFromSpotify = await initialUserInfoFromSpotify();
		if (!initialInfoFromSpotify) return userInfo.set(undefined);

		const getUserInfoFromSpotify = await getUser(initialInfoFromSpotify);
		if (getUserInfoFromSpotify?.success === true) {
			return userInfo.set(getUserInfoFromSpotify.userInfoFromMongoDB);
		}

		const userFromSpotify = await userInfoFromSpotify();
		if (!userFromSpotify) return userInfo.set(undefined);

		const createUserResult = await createUser({
			email: userFromSpotify.email,
			tickets: 5,
			discoveries: { updatedAt: '', tracks: [], artists: [] },
			connectedStreamings: { spotify: userFromSpotify, deezer: undefined }
		});

		if (createUserResult.success === true) {
			const $translationsStore = get(translationsStore);

			userInfo.set(createUserResult.createdUser);

			await fetch('/api/sending-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					subject: $translationsStore.templateEmail.welcomeToAllifySubject,
					emailTo: 'igorgabsprofissional@gmail.com',
					message: welcomeToAllifyTemplate(
						createUserResult.createdUser.connectedStreamings.spotify.name,
						'Spotify'
					)
				})
			});
		} else {
			userInfo.set(undefined);
		}
	} catch {
		userInfo.set(undefined);
	}
}
