// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { returnTicket } from '$lib/services/user/tickets/returnTicket';
import { getMostListenedArtists } from '$lib/services/spotify/stats/getMostListenedArtists';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

export async function updateMostListenedArtists(
	id: ObjectId,
	limit: number,
	tickets?: number,
	currentMostListenedArtists?: ArtistSpotify[],
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !limit) return;

		const nextFreeUpdateDate = nextFreeUpdate ? new Date(nextFreeUpdate) : null;

		const freeUpdateIsAvailable = !nextFreeUpdateDate || nextFreeUpdateDate <= new Date();

		if (!freeUpdateIsAvailable && (tickets !== undefined && tickets !== null)) {
			const ticketWasUsed = await useTicket(id, tickets);

			if (!ticketWasUsed) {
				throw new Error('Failed to use ticket');
			}
		}

		const getMostListenedArtistsResponse = await getMostListenedArtists(limit);

		if (!getMostListenedArtistsResponse) {
			if (tickets) {
				await returnTicket(id, tickets);
			}

			throw new Error('Failed to get most listened artists');
		}

		const { artistsLimit, mostListenedArtistItem, mostListenedArtistsItems } =
			getMostListenedArtistsResponse;

		const artistsWhoWereWithYou =
			currentMostListenedArtists?.filter(
				(artist) => !mostListenedArtistsItems.some((oldArtist) => oldArtist.id === artist.id)
			) ?? [];

		const updateMostListenedArtistsResponse = await fetch(
			'/api/mongodb/updates/update-most-listened-artists',
			{
				method: 'POST',
				body: JSON.stringify({
					id,
					limit: artistsLimit,
					mostListenedArtist: mostListenedArtistItem,
					mostListenedArtists: mostListenedArtistsItems,
					artistsWhoWereWithYou,
					freeUpdateIsAvailable,
					nextFreeUpdate
				})
			}
		);

		if (!updateMostListenedArtistsResponse.ok) {
			if ((tickets !== undefined && tickets !== null)) {
				await returnTicket(id, tickets);
			}

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
