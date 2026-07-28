// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { TrackSpotify } from '$lib/types/SpotifyData.type';

export async function updateTrackOfTheMoment(
	id: ObjectId,
	trackOfTheMoment: TrackSpotify
) {
	try {
		if (!id || !trackOfTheMoment) return;

		const response = await fetch('/api/mongodb/updates/update-track-of-the-moment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				trackOfTheMoment
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data.trackOfTheMoment;
	} catch (error) {
		if (dev) {
			console.error('User updateTrackOfTheMoment error:', error);
		}

		return null;
	}
}
