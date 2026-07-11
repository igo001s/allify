// Types
import type { buildProfileInfo } from '$lib/types/UserInfo.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function saveBuiltProfile(id: ObjectId, builtUser: buildProfileInfo) {
	try {
		const response = await fetch('/api/mongodb/updates/save-built-profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, builtUser })
		});

		const responseData = await response.json();

		if (!responseData.builtUser) {
			throw new Error('Request failed');
		}

		return responseData;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'User saveBuiltProfile error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return;
	}
}
