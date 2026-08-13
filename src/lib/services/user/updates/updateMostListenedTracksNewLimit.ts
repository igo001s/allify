// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { getMostListenedTracks } from '$lib/services/spotify/stats/getMostListenedTracks';

// Types
import type { TrackSpotify } from '$lib/types/SpotifyData.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function updateMostListenedTracksNewLimit(
	id: ObjectId,
	limit: number,
	tickets: number,
	currentMostListenedTracks?: TrackSpotify[]
) {
	try {
		if (!id || !limit) return;

		const responseUseTicket = await useTicket(id, tickets);

		if (!responseUseTicket) {
			return;
		}

		const response = await getMostListenedTracks(limit + 5);

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
				id,
				limit: tracksLimit,
				mostListenedTrack: mostListenedTrackItem,
				mostListenedTracks: mostListenedTracksItems,
				tracksWhoWereWithYou,
				updatedAt
			})
		});

		if (!updateResponse.ok) {
			throw new Error('Failed to update most listened tracks with new limit');
		}

		const updatedData = await updateResponse.json();

		return {
			...updatedData,
			tickets: responseUseTicket.tickets
		};
	} catch (error) {
		if (dev) {
			console.error('User updateMostListenedTracksNewLimit error:', error);
		}

		return;
	}
}
