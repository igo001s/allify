// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { TrackSpotify } from '$lib/types/SpotifyData.type';

export async function updateCustomTrack(
	id: ObjectId,
	customTrackTitle: string,
	customTrack: TrackSpotify
) {
	try {
		if (!id || !customTrackTitle || !customTrack) return;

		const response = await fetch('/api/mongodb/updates/update-custom-track', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				customTrackTitle,
				customTrack
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data.customTrack;
	} catch (error) {
		if (dev) {
			console.error('User updateCustomTrack error:', error);
		}

		return null;
	}
}
