// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function getFreeDiscoveries(
	id: ObjectId,
	mostListenedArtists: string[],
	mostListenedTracks: string[]
) {
	try {
		if (!id || !mostListenedTracks || !mostListenedArtists) return;

		const discoveriesResponse = await fetch('/api/ai/discoveries', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mostListenedTracks, mostListenedArtists })
		});

		if (!discoveriesResponse.ok) {
			throw new Error('Failed to fetch discoveries');
		}

		const { tracks, artists } = await discoveriesResponse.json();

		const updateDiscoveries = await fetch('/api/mongodb/updates/update-discoveries', {
			method: 'POST',
			body: JSON.stringify({ id, tracks, artists })
		});

		if (!updateDiscoveries.ok) {
			throw new Error('Failed to update discoveries');
		}

		const parsedUpdateDiscoveries = await updateDiscoveries.json();

		return {
			tracks: parsedUpdateDiscoveries.discoveries.tracks,
			artists: parsedUpdateDiscoveries.discoveries.artists,
			updatedAt: parsedUpdateDiscoveries.discoveries.updatedAt
		};
	} catch (error) {
		if (dev) {
			console.error('User getFreeDiscoveries error:', error);
		}

		return;
	}
}
