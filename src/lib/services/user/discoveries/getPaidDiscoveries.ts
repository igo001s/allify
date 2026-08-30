// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '../tickets/useTicket';
import { returnTicket } from '../tickets/returnTicket';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function getPaidDiscoveries(
	id: ObjectId,
	tickets: number,
	mostListenedArtists: string[],
	mostListenedTracks: string[]
) {
	try {
		if (!id || !tickets || !mostListenedTracks || !mostListenedArtists) return;

		const ticketWasUsed = await useTicket(id, tickets);

		if (!ticketWasUsed) {
			throw new Error('Failed to use ticket');
		}

		const discoveriesResponse = await fetch('/api/ai/discoveries', {
			method: 'POST',
			body: JSON.stringify({ mostListenedTracks, mostListenedArtists })
		});

		if (!discoveriesResponse.ok) {
			await returnTicket(id, tickets);

			throw new Error('Failed to fetch discoveries');
		}

		const { tracks, artists } = await discoveriesResponse.json();

		const updateDiscoveries = await fetch('/api/mongodb/updates/update-discoveries', {
			method: 'POST',
			body: JSON.stringify({ id, tracks, artists })
		});

		if (!updateDiscoveries.ok) {
			await returnTicket(id, tickets);

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
			console.error('User getPaidDiscoveries error:', error instanceof Error ? error.message : error);
		}

		return;
	}
}
