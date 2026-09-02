// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '../tickets/useTicket';
import { returnTicket } from '../tickets/returnTicket';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { TrackSpotify } from '$lib/types/Spotify.type';

export async function updateCustomTrack(
	id: ObjectId,
	customTrackTitle: string,
	customTrack: TrackSpotify,
	tickets?: number,
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !customTrackTitle || !customTrack) return;

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

		const response = await fetch('/api/mongodb/updates/update-custom-track', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				customTrackTitle,
				customTrack,
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
				'User updateCustomTrack error:',
				error instanceof Error ? error.message : error
			);
		}

		return {
			error: true,
			errorType: 'updateCustomTrackError'
		};
	}
}
