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
import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

export async function updateArtistOfTheMoment(
	id: ObjectId,
	artistOfTheMoment: ArtistSpotify,
	email?: string,
	tickets?: number,
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !artistOfTheMoment) {
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
					currentUser.tickets = (currentUser.tickets || 0) - 1;
				}

				return currentUser;
			});
		}

		const response = await fetch('/api/mongodb/updates/update-artist-of-the-moment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				artistOfTheMoment
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data.artistOfTheMoment;
	} catch (error) {
		if (dev) {
			console.error('User updateArtistOfTheMoment error:', error);
		}

		return null;
	}
}
