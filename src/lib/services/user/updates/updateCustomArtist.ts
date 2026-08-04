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

export async function updateCustomArtist(
	id: ObjectId,
	customArtistTitle: string,
	customArtist: ArtistSpotify,
	email?: string,
	tickets?: number,
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !customArtistTitle || !customArtist) {
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

		const response = await fetch('/api/mongodb/updates/update-custom-artist', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				customArtistTitle,
				customArtist,
				freeUpdateIsAvailable,
				nextFreeUpdate
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data.customArtist;
	} catch (error) {
		if (dev) {
			console.error('User updateCustomArtist error:', error);
		}

		return null;
	}
}
