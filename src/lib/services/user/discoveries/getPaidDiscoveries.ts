// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '../tickets/useTicket';

export async function getPaidDiscoveries(
	email: string,
	tickets: number,
	mostListenedArtists: string[],
	mostListenedTracks: string[]
) {
	try {
		if (!email || !tickets || !mostListenedTracks || !mostListenedArtists) return;

		const responseUseTicket = await useTicket(email, tickets);

		if (!responseUseTicket.ok) {
			throw new Error('Failed to use ticket');
		}

		const response = await fetch('/api/ai/discoveries', {
			method: 'POST',
			body: JSON.stringify({ mostListenedTracks, mostListenedArtists })
		});

		if (!response.ok) {
			throw new Error('Failed to fetch discoveries');
		}

		const { tracks, artists } = await response.json();

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
			updatedAt: updateData.discoveries.updatedAt,
			tickets: responseUseTicket.tickets
		};
	} catch (error) {
		if (dev) {
			console.error(
				'User getPaidDiscoveries error:',
				error
			);
		}

		return;
	}
}
