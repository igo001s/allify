// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function setProfileVisibilityPublicByDefault(id: ObjectId) {
	try {
		const response = await fetch('/api/mongodb/user/set-profile-visibility-public-by-default', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});

		const data = await response.json();

		if (!data.profileVisibility) {
			throw new Error('Request failed');
		}

		return data.profileVisibility;
	} catch (error) {
		if (dev) {
			console.error('User setProfileVisibilityPublicByDefault error:', error);
		}

		return;
	}
}
