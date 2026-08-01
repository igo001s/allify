// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

export async function updateCustomArtist(
	id: ObjectId,
	customArtistTitle: string,
	customArtist: ArtistSpotify
) {
	try {
		if (!id || !customArtistTitle || !customArtist) return;

		const response = await fetch('/api/mongodb/updates/update-custom-artist', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				customArtistTitle,
				customArtist
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data.customArtist;
	} catch (error) {
		if (dev) {
			console.error('User updateCustomArtist error:', error);
		}

		return null;
	}
}
