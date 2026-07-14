// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { getMostListenedTracks } from '$lib/services/spotify/stats/getMostListenedTracks';

export async function updateMostListenedTracks(email: string, limit: number, tickets: number) {
	try {
		if (!email || !tickets || !limit) return;

		const responseUseTicket = await useTicket(email, tickets);

		if (!responseUseTicket) {
			throw new Error('Failed to use ticket');
		}

		const response = await getMostListenedTracks(limit + 5);

		if (!response) {
			throw new Error('Failed to get most listened tracks');
		}

		const { tracksLimit, mostListenedTrackItem, mostListenedTracksItems, updatedAt } = response;

		const updateResponse = await fetch('/api/mongodb/updates/update-most-listened-tracks', {
			method: 'POST',
			body: JSON.stringify({
				email,
				limit: tracksLimit,
				mostListenedTrack: mostListenedTrackItem,
				mostListenedTracks: mostListenedTracksItems,
				updatedAt
			})
		});

		if (!updateResponse.ok) {
			throw new Error('Failed to update most listened tracks');
		}

		const updatedData = await updateResponse.json();

		return {
			...updatedData,
			tickets: responseUseTicket.tickets
		};
	} catch (error) {
		if (dev) {
			console.error(
				'User updateMostListenedTracks error:',
				error
			);
		}

		return;
	}
}
