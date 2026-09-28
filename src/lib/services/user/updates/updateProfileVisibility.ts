// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function updateProfileVisibility(
	id?: ObjectId,
	profileVisibility?: string,
	nextUpdate?: Date
) {
	try {
		if (!id || !profileVisibility) return;

		const nextUpdateDate = nextUpdate ? new Date(nextUpdate) : null;

		const updateIsAvailable = !nextUpdateDate || nextUpdateDate <= new Date();

		if (!updateIsAvailable) {
			return {
				error: true,
				errorType: 'updateNotAvailable'
			};
		}

		const response = await fetch('/api/mongodb/user/update-profile-visibility', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				profileVisibility,
				updateIsAvailable,
				nextUpdate
			})
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
				'User updateProfileVisibility error:',
				error instanceof Error ? error.message : error
			);
		}

		return {
			error: true,
			errorType: 'updateProfileVisibilityError'
		};
	}
}
