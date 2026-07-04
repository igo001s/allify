// MongoDB
import type { ObjectId } from 'mongodb';

export async function removeFromFavorites(idToRemove: ObjectId, id: ObjectId) {
	try {
		if (!idToRemove || !id) return;

		const response = await fetch('/api/mongodb/updates/remove-from-favorites', {
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
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'User removeFromFavorites error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return null;
	}
}
