// Svelte
import { dev } from '$app/environment';

// Types
import type { UserInfoSpotify } from '$lib/types/Spotify.type';

export async function createUser(streaming: string, streamingData: UserInfoSpotify) {
	try {
		if (!streaming || !streamingData) {
			return null;
		}

		const response = await fetch('/api/mongodb/user/create-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ streaming, streamingData })
		});

		const parsedResponse = await response.json();

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		return parsedResponse;
	} catch (error) {
		if (dev) {
			console.error('User createUser error:', error instanceof Error ? error.message : error);
		}

		return null;
	}
}
