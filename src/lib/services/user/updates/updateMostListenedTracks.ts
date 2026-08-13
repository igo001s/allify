// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { returnTicket } from '$lib/services/user/tickets/returnTicket';
import { getMostListenedTracks } from '$lib/services/spotify/stats/getMostListenedTracks';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { TrackSpotify } from '$lib/types/SpotifyData.type';

export async function updateMostListenedTracks(
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

		const getMostListenedTracksResponse = await getMostListenedTracks(limit);

		if (!getMostListenedTracksResponse) {
			await returnTicket(id, tickets);

			throw new Error('Failed to get most listened tracks');
		}

		const { tracksLimit, mostListenedTrackItem, mostListenedTracksItems, updatedAt } =
			getMostListenedTracksResponse;

		const artistsWhoWereWithYou =
			currentMostListenedTracks?.filter(
				(track) => !mostListenedTracksItems.some((oldTrack) => oldTrack.id === track.id)
			) ?? [];

		const updateMostListenedTracksResponse = await fetch(
			'/api/mongodb/updates/update-most-listened-tracks',
			{
				method: 'POST',
				body: JSON.stringify({
					id,
					limit: tracksLimit,
					mostListenedTrack: mostListenedTrackItem,
					mostListenedTracks: mostListenedTracksItems,
					artistsWhoWereWithYou,
					updatedAt
				})
			}
		);

		if (!updateMostListenedTracksResponse.ok) {
			await returnTicket(id, tickets);

			throw new Error('Failed to update most listened tracks');
		}

		const parsedUpdateMostListenedTracks = await updateMostListenedTracksResponse.json();

		return parsedUpdateMostListenedTracks;
	} catch (error) {
		if (dev) {
			console.error('User updateMostListenedTracks error:', error);
		}

		return;
	}
}
