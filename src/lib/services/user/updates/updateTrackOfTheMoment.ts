// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '../tickets/useTicket';
import { returnTicket } from '../tickets/returnTicket';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { TrackSpotify } from '$lib/types/SpotifyData.type';

export async function updateTrackOfTheMoment(
	id: ObjectId,
	trackOfTheMoment: TrackSpotify,
	tickets?: number,
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !trackOfTheMoment) {
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

		const updateTrackOfTheMomentResponse = await fetch(
			'/api/mongodb/updates/update-track-of-the-moment',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id,
					trackOfTheMoment,
					freeUpdateIsAvailable,
					nextFreeUpdate
				})
			}
		);

		if (!updateTrackOfTheMomentResponse.ok && tickets !== undefined && tickets !== null) {
			await returnTicket(id, tickets);

			throw new Error('Failed to update track of the moment');
		}

		const parsedUpdateTrackOfTheMoment = await updateTrackOfTheMomentResponse.json();

		return parsedUpdateTrackOfTheMoment.trackOfTheMoment;
	} catch (error) {
		if (dev) {
			console.error('User updateTrackOfTheMoment error:', error);
		}

		return null;
	}
}
