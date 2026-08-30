// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function setProfileVisibilityPublicByDefault(id: ObjectId) {
	try {
		if (!id) return null;

		const setProfileVisibilityPublicByDefaultResponse = await fetch(
			'/api/mongodb/user/set-profile-visibility-public-by-default',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			}
		);

		const parsedSetProfileVisibilityPublicByDefault =
			await setProfileVisibilityPublicByDefaultResponse.json();

		if (!parsedSetProfileVisibilityPublicByDefault.profileVisibility) {
			throw new Error('Request failed');
		}

		return parsedSetProfileVisibilityPublicByDefault.profileVisibility;
	} catch (error) {
		if (dev) {
			console.error(
				'User setProfileVisibilityPublicByDefault error:',
				error instanceof Error ? error.message : error
			);
		}

		return null;
	}
}
