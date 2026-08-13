// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { getMostListenedArtists } from '$lib/services/spotify/stats/getMostListenedArtists';
import { returnTicket } from '../tickets/returnTicket';

// Types
import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function updateMostListenedArtistsNewLimit(
	id: ObjectId,
	limit: number,
	tickets: number,
	currentMostListenedArtists?: ArtistSpotify[]
) {
	try {
		if (!id || !limit) return;

		const ticketWasUsed = await useTicket(id, tickets);
		
		if (!ticketWasUsed) {
			throw new Error('Failed to use ticket');
		}
		
		const getMostListenedArtistsResponse = await getMostListenedArtists(limit + 5);

		if (!getMostListenedArtistsResponse) {
			await returnTicket(id, tickets);

			throw new Error('Failed to get most listened artists');
		}

		const { artistsLimit, mostListenedArtistItem, mostListenedArtistsItems, updatedAt } = getMostListenedArtistsResponse;

		const artistsWhoWereWithYou =
			currentMostListenedArtists?.filter(
				(artist) => !mostListenedArtistsItems.some((oldArtist) => oldArtist.id === artist.id)
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

			throw new Error('Failed to update most listened artists with new limit');
		}

		const parsedUpdateMostListenedArtists = await updateMostListenedArtistsResponse.json();

		return parsedUpdateMostListenedArtists;
	} catch (error) {
		if (dev) {
			console.error('User updateMostListenedArtistsNewLimit error:', error);
		}

		return;
	}
}
