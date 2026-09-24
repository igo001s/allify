// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { getMostListenedArtists } from '$lib/services/spotify/stats/getMostListenedArtists';
import { returnTicket } from '../tickets/returnTicket';

// Types
import type { ArtistsSpotify } from '$lib/types/Spotify.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function updateMostListenedArtistsNewLimit(
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

		const getMostListenedArtistsResponse = await getMostListenedArtists(limit + 5);

		if (!getMostListenedArtistsResponse) {
			if (tickets !== undefined && tickets !== null) {
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

		if (!response.ok) {
			if (tickets !== undefined && tickets !== null) {
				await returnTicket(id, tickets);
			}

			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		return parsedResponse;
	} catch (error) {
		if (dev) {
			console.error(
				'User updateMostListenedArtistsNewLimit error:',
				error instanceof Error ? error.message : error
			);
		}

		return {
			error: true,
			errorType: 'updateMostListenedArtistsNewLimitError'
		};
	}
}
