// Svelte
import { dev } from '$app/environment';

// Stores
import { showAddTickets } from '$lib/stores/showAddTickets.store';
import { userInfo } from '$lib/stores/userInfo.store';

// Services
import { useTicket } from '../tickets/useTicket';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { TrackSpotify } from '$lib/types/SpotifyData.type';

export async function updateCustomTrack(
	id: ObjectId,
	customTrackTitle: string,
	customTrack: TrackSpotify,
	email?: string,
	tickets?: number,
	nextFreeUpdate?: Date
) {
	console.log('updateCustomTrack called with:', {
		id,
		customTrackTitle,
		customTrack,
		email,
		tickets,
		nextFreeUpdate
	});

	try {
		if (!id || !customTrackTitle || !customTrack) {
			return null;
		}

		const nextFreeUpdateDate = nextFreeUpdate ? new Date(nextFreeUpdate) : null;

		const freeUpdateIsAvailable = !nextFreeUpdateDate || nextFreeUpdateDate <= new Date();

		if (!freeUpdateIsAvailable) {
			if (tickets === undefined || tickets <= 0) {
				showAddTickets.set(true);

				return null;
			}

			const ticketWasUsed = await useTicket(email || '', tickets);

			if (!ticketWasUsed) {
				throw new Error('Failed to use ticket');
			}

			userInfo.update((currentUser) => {
				if (currentUser) {
					currentUser.tickets = currentUser.tickets - 1;
				}

				return currentUser;
			});
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

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data.customTrack;
	} catch (error) {
		if (dev) {
			console.error('User updateCustomTrack error:', error);
		}

		return null;
	}
}
