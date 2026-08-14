// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '../tickets/useTicket';
import { returnTicket } from '../tickets/returnTicket';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { TrackSpotify } from '$lib/types/SpotifyData.type';

export async function updateCustomTrack(
	id: ObjectId,
	customTrackTitle: string,
	customTrack: TrackSpotify,
	tickets?: number,
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !customTrackTitle || !customTrack) {
			return null;
		}

		const nextFreeUpdateDate = nextFreeUpdate ? new Date(nextFreeUpdate) : null;

		const freeUpdateIsAvailable = !nextFreeUpdateDate || nextFreeUpdateDate <= new Date();

		if (!freeUpdateIsAvailable && tickets !== undefined && tickets !== null) {
			const ticketWasUsed = await useTicket(id, tickets);

			if (!ticketWasUsed) {
				throw new Error('Failed to use ticket');
			}
		}

		const updateCustomTrackResponse = await fetch('/api/mongodb/updates/update-custom-track', {
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

		if (!updateCustomTrackResponse.ok && tickets !== undefined && tickets !== null) {
			await returnTicket(id, tickets);

			throw new Error('Failed to update custom track');
		}

		const parsedUpdateCustomTrack = await updateCustomTrackResponse.json();

		return parsedUpdateCustomTrack.customTrack;
	} catch (error) {
		if (dev) {
			console.error('User updateCustomTrack error:', error);
		}

		return null;
	}
}
