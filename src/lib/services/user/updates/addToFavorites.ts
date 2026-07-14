// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function addToFavorites(
	idToSave: ObjectId,
	id: ObjectId,
	name: string,
	image: {
		url: string;
		height: number | null;
		width: number | null;
	},
	spotifyConnected?: boolean,
	deezerConnected?: boolean
) {
	try {
		if (!idToSave || !id || !name || !image) return;

		const response = await fetch('/api/mongodb/updates/add-to-favorites', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idToSave,
				id,
				name,
				image,
				spotifyConnected,
				deezerConnected
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		if (dev) {
			console.error(
				'User addToFavorites error:',
				error
			);
		}

		return null;
	}
}
