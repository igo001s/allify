// Types
import type { UserInfoSpotify } from '$lib/types/SpotifyData.type';

export async function createUser(email: string, streaming: string, streamingData: UserInfoSpotify) {
	try {
		const response = await fetch('/api/mongodb/user/create-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, streaming, streamingData })
		});

		const responseData = await response.json();

		if (!responseData.createdUser) {
			throw new Error('Request failed');
		}

		return responseData;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'User createUser error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return;
	}
}
