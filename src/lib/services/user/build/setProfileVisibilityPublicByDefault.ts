// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function setProfileVisibilityPublicByDefault(id: ObjectId) {
	try {
		if (!id) return null;

		const response = await fetch('/api/mongodb/user/set-profile-visibility-public-by-default', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		return parsedResponse;
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
