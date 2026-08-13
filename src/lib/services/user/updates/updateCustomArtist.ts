// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '../tickets/useTicket';
import { returnTicket } from '../tickets/returnTicket';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

export async function updateCustomArtist(
	id: ObjectId,
	customArtistTitle: string,
	customArtist: ArtistSpotify,
	tickets?: number,
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !customArtistTitle || !customArtist) {
			return null;
		}

		const nextFreeUpdateDate = nextFreeUpdate ? new Date(nextFreeUpdate) : null;

		const freeUpdateIsAvailable = !nextFreeUpdateDate || nextFreeUpdateDate <= new Date();

		if (!freeUpdateIsAvailable && tickets) {
			const ticketWasUsed = await useTicket(id, tickets);
			
			if (!ticketWasUsed) {
				throw new Error('Failed to use ticket');
			}
		}

		const updateCustomArtistResponse = await fetch('/api/mongodb/updates/update-custom-artist', {
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

		if (!updateCustomArtistResponse.ok && tickets) {
			await returnTicket(id, tickets);

			throw new Error('Failed to update custom artist');
		}

		const parsedUpdateCustomArtist = await updateCustomArtistResponse.json();

		return parsedUpdateCustomArtist.customArtist;
	} catch (error) {
		if (dev) {
			console.error('User updateCustomArtist error:', error);
		}

		return null;
	}
}
