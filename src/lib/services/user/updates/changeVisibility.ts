// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function changeVisibility(id: ObjectId, profileVisibility: string) {
	try {
		if (!id || !profileVisibility) return;

		const response = await fetch('/api/mongodb/user/change-visibility', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				profileVisibility
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data.profileVisibilityUpdated;
	} catch (error) {
		if (dev) {
			console.error('User changeVisibility error:', error);
		}

		return null;
	}
}
