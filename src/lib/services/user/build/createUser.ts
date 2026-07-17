// Svelte
import { dev } from '$app/environment';

// Types
import type { UserInfoSpotify } from '$lib/types/SpotifyData.type';

export async function createUser(
	name: string,
	email: string,
	streaming: string,
	streamingData: UserInfoSpotify
) {
	try {
		const response = await fetch('/api/mongodb/user/create-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, streaming, streamingData })
		});

		const responseData = await response.json();

		if (!responseData.createdUser) {
			throw new Error('Request failed');
		}

		return responseData;
	} catch (error) {
		if (dev) {
			console.error('User createUser error:', error);
		}

		return;
	}
}
