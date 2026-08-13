// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '../tickets/useTicket';
import { returnTicket } from '../tickets/returnTicket';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function updateProfileVisibility(
	id: ObjectId,
	profileVisibility: string,
	tickets?: number,
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !profileVisibility) {
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

		const updateProfileVisibilityResponse = await fetch('/api/mongodb/user/update-profile-visibility', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				profileVisibility,
				freeUpdateIsAvailable,
				nextFreeUpdate
			})
		});

		if (!updateProfileVisibilityResponse.ok && tickets) {
			await returnTicket(id, tickets);
			
			throw new Error('Failed to update most listened artists');
		}

		const parsedupdateProfileVisibility = await updateProfileVisibilityResponse.json();

		return parsedupdateProfileVisibility.profileVisibilityUpdated;
	} catch (error) {
		if (dev) {
			console.error('User changeVisibility error:', error);
		}

		return null;
	}
}
