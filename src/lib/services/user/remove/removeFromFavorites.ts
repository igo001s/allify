// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function removeFromFavorites(idToRemove: ObjectId, id: ObjectId) {
	try {
		if (!idToRemove || !id) return;

		const response = await fetch('/api/mongodb/remove/remove-from-favorites', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idToRemove,
				id
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
				'User removeFromFavorites error:',
				error instanceof Error ? error.message : error
			);
		}

		return {
			error: true,
			typeError: 'removeFromFavorites'
		};
	}
}
