// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { getMostListenedTracks } from '$lib/services/spotify/stats/getMostListenedTracks';

// Types
import type { TrackSpotify } from '$lib/types/SpotifyData.type';

export async function updateMostListenedTracks(
	email: string,
	limit: number,
	tickets: number,
	currentMostListenedTracks?: TrackSpotify[]
) {
	try {
		if (!email || !limit) return;

		const responseUseTicket = await useTicket(email, tickets);

		if (!responseUseTicket) {
			throw new Error('Failed to use ticket');
		}

		const response = await getMostListenedTracks(limit);

		if (!response) {
			throw new Error('Failed to get most listened tracks');
		}

		const { tracksLimit, mostListenedTrackItem, mostListenedTracksItems, updatedAt } = response;

		const tracksWhoWereWithYou =
			currentMostListenedTracks?.filter(
				(track) => !mostListenedTracksItems.some((oldTrack) => oldTrack.id === track.id)
			) ?? [];

		const updateResponse = await fetch('/api/mongodb/updates/update-most-listened-tracks', {
			method: 'POST',
			body: JSON.stringify({
				email,
				limit: tracksLimit,
				mostListenedTrack: mostListenedTrackItem,
				mostListenedTracks: mostListenedTracksItems,
				tracksWhoWereWithYou,
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
			console.error('User updateMostListenedTracks error:', error);
		}

		return;
	}
}
