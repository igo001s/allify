// Svelte
import { dev } from '$app/environment';

export async function getFreeDiscoveries(
	email: string,
	mostListenedArtists: string[],
	mostListenedTracks: string[]
) {
	try {
		if (!email || !mostListenedTracks || !mostListenedArtists) return;

		const response = await fetch('/api/ai/discoveries', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mostListenedTracks, mostListenedArtists })
		});

		if (!response.ok) {
			throw new Error('Failed to fetch discoveries');
		}

		const { tracks, artists } = response.ok ? await response.json() : {};

		const updateDiscoveries = await fetch('/api/mongodb/updates/update-discoveries', {
			method: 'POST',
			body: JSON.stringify({ email, tracks, artists })
		});

		if (!updateDiscoveries.ok) {
			throw new Error('Failed to update discoveries');
		}

		const updateData = await updateDiscoveries.json();

		return {
			tracks: updateData.discoveries.tracks,
			artists: updateData.discoveries.artists,
			updatedAt: updateData.discoveries.updatedAt
		};
	} catch (error) {
		if (dev) {
			console.error(
				'User getFreeDiscoveries error:',
				error
			);
		}

		return;
	}
}
