// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function removeFromFavorites(idToRemove: ObjectId, id: ObjectId) {
	try {
		if (!idToRemove || !id) return;

		const removeFromFavoritesResponse = await fetch('/api/mongodb/remove/remove-from-favorites', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idToRemove,
				id
			})
		});

		if (!removeFromFavoritesResponse.ok) {
			const error = await removeFromFavoritesResponse.json();
			throw new Error(error.error);
		}

		const parsedRemoveFromFavorites = await removeFromFavoritesResponse.json();

		return parsedRemoveFromFavorites;
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
