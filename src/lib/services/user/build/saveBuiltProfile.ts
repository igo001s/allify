// Svelte
import { dev } from '$app/environment';

// Types
import type { buildProfileInfo } from '$lib/types/UserInfo.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function saveBuiltProfile(id: ObjectId, builtUser: buildProfileInfo) {
	try {
		const saveBuiltProfileResponse = await fetch('/api/mongodb/user/save-built-profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, builtUser })
		});

		const parsedSaveBuiltProfile = await saveBuiltProfileResponse.json();

		if (!parsedSaveBuiltProfile.builtUser) {
			throw new Error('Request failed');
		}

		return parsedSaveBuiltProfile.builtUser;
	} catch (error) {
		if (dev) {
			console.error('User saveBuiltProfile error:', error);
		}

		return;
	}
}
