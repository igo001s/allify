// Types
import type { UserInfoSpotify } from '$lib/types/SpotifyData.type';

export async function createUser(email: string, streaming: string, streamingData: UserInfoSpotify) {
	const createUserOnMongoDB = await fetch('/api/mongodb/create-user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, streaming, streamingData })
	});

	const resJson = await createUserOnMongoDB.json();

	if (!resJson.success) {
		throw new Error(resJson.error || 'Request failed');
	}

	return resJson;
}
