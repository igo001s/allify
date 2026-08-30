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
		const response = await fetch('/api/mongodb/user/create-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, streaming, streamingData })
		});

		const parsedResponse = await response.json();

		if (!parsedResponse.createdUser) {
			throw new Error('Request failed');
		}

		return parsedResponse;
	} catch (error) {
		if (dev) {
			console.error('User createUser error:', error instanceof Error ? error.message : error);
		}

		return null;
	}
}
