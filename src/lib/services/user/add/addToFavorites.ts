// Svelte
import { dev } from '$app/environment';

// Types
import type { AvatarImage } from '$lib/types/Image.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function addToFavorites(
	idToSave: ObjectId,
	id: ObjectId,
	name: string,
	image: AvatarImage,
	spotifyConnected?: boolean,
	deezerConnected?: boolean
) {
	try {
		if (!idToSave || !id || !name || !image) return;

		const response = await fetch('/api/mongodb/add/add-to-favorites', {
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
			console.error('User addToFavorites error:', error);
		}

		return null;
	}
}
