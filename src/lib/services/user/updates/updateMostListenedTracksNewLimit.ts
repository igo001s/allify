// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { returnTicket } from '../tickets/returnTicket';
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

		const ticketWasUsed = await useTicket(id, tickets);
		
		if (!ticketWasUsed) {
			throw new Error('Failed to use ticket');
		}

		const getMostListenedTrackResponse = await getMostListenedTracks(limit + 5);

		if (!getMostListenedTrackResponse) {
			await returnTicket(id, tickets);

			throw new Error('Failed to get most listened tracks');
		}

		const { tracksLimit, mostListenedTrackItem, mostListenedTracksItems, updatedAt } = getMostListenedTrackResponse;

		const tracksWhoWereWithYou =
			currentMostListenedTracks?.filter(
				(track) => !mostListenedTracksItems.some((oldTrack) => oldTrack.id === track.id)
			) ?? [];

		const updateMostListenedTracksResponse = await fetch('/api/mongodb/updates/update-most-listened-tracks', {
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

		if (!updateMostListenedTracksResponse.ok) {
			await returnTicket(id, tickets);

			throw new Error('Failed to update most listened tracks with new limit');
		}

		const parsedUpdateMostListenedTracks = await updateMostListenedTracksResponse.json();

		return parsedUpdateMostListenedTracks;
	} catch (error) {
		if (dev) {
			console.error('User updateMostListenedTracksNewLimit error:', error);
		}

		return;
	}
}
