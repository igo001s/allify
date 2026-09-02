// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '../tickets/useTicket';
import { returnTicket } from '../tickets/returnTicket';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function updateProfileVisibility(
	id?: ObjectId,
	profileVisibility?: string,
	tickets?: number,
	nextFreeUpdate?: Date
) {
	try {
		if (!id || !profileVisibility) return;

		const nextFreeUpdateDate = nextFreeUpdate ? new Date(nextFreeUpdate) : null;

		const freeUpdateIsAvailable = !nextFreeUpdateDate || nextFreeUpdateDate <= new Date();

		if (!freeUpdateIsAvailable && tickets !== undefined && tickets !== null) {
			const ticketWasUsed = await useTicket(id, tickets);

			if (!ticketWasUsed) {
				throw new Error('Failed to use ticket');
			}
		}

		const response = await fetch('/api/mongodb/user/update-profile-visibility', {
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
				'User updateProfileVisibility error:',
				error instanceof Error ? error.message : error
			);
		}

		return {
			error: true,
			errorType: 'updateProfileVisibilityError'
		};
	}
}
