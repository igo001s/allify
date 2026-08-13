// Svelte
import { dev } from '$app/environment'

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { returnTicket } from '$lib/services/user/tickets/returnTicket';
import { getMostListenedArtists } from '$lib/services/spotify/stats/getMostListenedArtists';

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

		const getMostListenedArtistsResponse = await getMostListenedArtists(limit);

		if (!getMostListenedArtistsResponse) {
			await returnTicket(id, tickets);

			throw new Error('Failed to get most listened artists');
		}

		const { artistsLimit, mostListenedArtistItem, mostListenedArtistsItems, updatedAt } = getMostListenedArtistsResponse;

		const artistsWhoWereWithYou =
			currentMostListenedTracks?.filter(
				(track) => !mostListenedArtistsItems.some((oldTrack) => oldTrack.id === track.id)
			) ?? [];

		const updateMostListenedArtistsResponse = await fetch('/api/mongodb/updates/update-most-listened-artists', {
			method: 'POST',
			body: JSON.stringify({
				id,
				limit: artistsLimit,
				mostListenedArtist: mostListenedArtistItem,
				mostListenedArtists: mostListenedArtistsItems,
				artistsWhoWereWithYou,
				updatedAt
			})
		});

		if (!updateMostListenedArtistsResponse.ok) {
			await returnTicket(id, tickets);

			throw new Error('Failed to update most listened artists');
		}

		const parsedUpdateMostListenedArtists = await updateMostListenedArtistsResponse.json();

		return parsedUpdateMostListenedArtists;
	} catch (error) {
		if (dev) {
			console.error('User updateMostListenedArtists error:', error);
		}

		return;
	}
}