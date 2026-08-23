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

		const addToFavoritesResponse = await fetch('/api/mongodb/add/add-to-favorites', {
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

		if (!addToFavoritesResponse.ok) {
			const error = await addToFavoritesResponse.json();
			throw new Error(error.error);
		}

		const parsedaddToFavorites = await addToFavoritesResponse.json();

		return parsedaddToFavorites;
	} catch (error) {
		if (dev) {
			console.error('User addToFavorites error:', error);
		}

		return null;
	}
}
