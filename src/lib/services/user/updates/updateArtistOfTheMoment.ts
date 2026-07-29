// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

export async function updateArtistOfTheMoment(id: ObjectId, artistOfTheMoment: ArtistSpotify) {
	try {
		if (!id || !artistOfTheMoment) return;

		const response = await fetch('/api/mongodb/updates/update-artist-of-the-moment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				artistOfTheMoment
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data.artistOfTheMoment;
	} catch (error) {
		if (dev) {
			console.error('User updateArtistOfTheMoment error:', error);
		}

		return null;
	}
}
