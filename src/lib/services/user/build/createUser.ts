// Svelte
import { dev } from '$app/environment';

// Types
import type { UserInfoSpotify } from '$lib/types/Spotify.type';

export async function createUser(
	name: string,
	email: string,
	streaming: string,
	streamingData: UserInfoSpotify
) {
	try {
		const createUserResponse = await fetch('/api/mongodb/user/create-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, streaming, streamingData })
		});

		const parsedCreateUser = await createUserResponse.json();

		if (!parsedCreateUser.createdUser) {
			throw new Error('Request failed');
		}

		return parsedCreateUser;
	} catch (error) {
		if (dev) {
			console.error('User createUser error:', error);
		}

		return;
	}
}
