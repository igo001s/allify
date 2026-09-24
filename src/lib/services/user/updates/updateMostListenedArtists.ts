// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { returnTicket } from '$lib/services/user/tickets/returnTicket';
import { getMostListenedArtists } from '$lib/services/spotify/stats/getMostListenedArtists';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { ArtistsSpotify } from '$lib/types/Spotify.type';

export async function updateMostListenedArtists(
	id: ObjectId,
	limit: number,
	tickets?: number,
	currentMostListenedArtists?: ArtistsSpotify,
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !limit) return;

		const nextFreeUpdateDate = nextFreeUpdate ? new Date(nextFreeUpdate) : null;

		const freeUpdateIsAvailable = !nextFreeUpdateDate || nextFreeUpdateDate <= new Date();

		if (!freeUpdateIsAvailable && tickets !== undefined && tickets !== null) {
			const ticketWasUsed = await useTicket(id, tickets);

			if (!ticketWasUsed) {
				return {
					error: true,
					errorType: 'ticketUsageFailed'
				};
			}
		}

		const getMostListenedArtistsResponse = await getMostListenedArtists(limit);

		if (!getMostListenedArtistsResponse) {
			if (tickets) {
				await returnTicket(id, tickets);
			}

			throw new Error('Failed to get most listened artists');
		}

		const { artistsLimit, fourWeeks, sixMonths, oneYear, uniqueArtists } =
			getMostListenedArtistsResponse;

		const artistsWhoWereWithYou =
			currentMostListenedArtists?.uniqueArtists
				?.filter(
					(artist) => !uniqueArtists?.some((currentArtist) => currentArtist.id === artist.id)
				)
				.map((artist) => ({
					artist,
					lastSeen: new Date()
				})) ?? [];

		const response = await fetch('/api/mongodb/updates/update-most-listened-artists', {
			method: 'POST',
			body: JSON.stringify({
				id,
				limit: artistsLimit,
				fourWeeks,
				sixMonths,
				oneYear,
				uniqueArtists,
				artistsWhoWereWithYou,
				freeUpdateIsAvailable,
				nextFreeUpdate
			})
		});

		if (!response.ok && tickets !== undefined && tickets !== null) {
			await returnTicket(id, tickets);

			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		return parsedResponse;
	} catch (error) {
		if (dev) {
			console.error(
				'User updateMostListenedArtists error:',
				error instanceof Error ? error.message : error
			);
		}

		return {
			error: true,
			errorType: 'updateMostListenedArtistsError'
		};
	}
}
