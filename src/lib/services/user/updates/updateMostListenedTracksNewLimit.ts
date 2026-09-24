// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { returnTicket } from '$lib/services/user/tickets/returnTicket';
import { getMostListenedTracks } from '$lib/services/spotify/stats/getMostListenedTracks';

// Types
import type { TracksSpotify } from '$lib/types/Spotify.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function updateMostListenedTracksNewLimit(
	id: ObjectId,
	limit: number,
	tickets?: number,
	currentMostListenedTracks?: TracksSpotify,
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

		const getMostListenedTrackResponse = await getMostListenedTracks(limit + 5);

		if (!getMostListenedTrackResponse) {
			if (tickets !== undefined && tickets !== null) {
				await returnTicket(id, tickets);
			}

			throw new Error('Failed to get most listened tracks');
		}

		const { tracksLimit, fourWeeks, sixMonths, oneYear, uniqueTracks } =
			getMostListenedTrackResponse;

		const tracksWhoWereWithYou =
			currentMostListenedTracks?.uniqueTracks
				?.filter((track) => !uniqueTracks?.some((currentTrack) => currentTrack.id === track.id))
				.map((track) => ({
					track,
					lastSeen: new Date()
				})) ?? [];

		const response = await fetch('/api/mongodb/updates/update-most-listened-tracks', {
			method: 'POST',
			body: JSON.stringify({
				id,
				limit: tracksLimit,
				fourWeeks,
				sixMonths,
				oneYear,
				uniqueTracks,
				tracksWhoWereWithYou,
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
				'User updateMostListenedTracksNewLimit error:',
				error instanceof Error ? error.message : error
			);
		}

		return {
			error: true,
			errorType: 'updateMostListenedTracksNewLimitError'
		};
	}
}
