// Svelte
import { dev } from '$app/environment';

// Types
import type { buildProfileInfo } from '$lib/types/UserInfo.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function saveBuiltProfile(id: ObjectId, builtUser: buildProfileInfo) {
	try {
		if (!id || !builtUser) return;

		const response = await fetch('/api/mongodb/user/save-built-profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, builtUser })
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		return parsedResponse.builtUser;
	} catch (error) {
		if (dev) {
			console.error('User saveBuiltProfile error:', error instanceof Error ? error.message : error);
		}

		return {
			error: true,
			errorType: 'userBuiltProfile'
		};
	}
}
