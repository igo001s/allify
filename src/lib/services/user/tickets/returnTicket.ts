// Svelte
import { dev } from '$app/environment';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function returnTicket(id: ObjectId, tickets: number) {
	try {
		const response = await fetch('/api/mongodb/tickets/return-ticket', {
			method: 'POST',
			body: JSON.stringify({ id, tickets })
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		userInfo.update((currentUser) => {
			if (currentUser) {
				currentUser.tickets = parsedResponse.tickets;
			}

			return currentUser;
		});

		return true;
	} catch (error) {
		if (dev) {
			console.error('User returnTicket error:', error instanceof Error ? error.message : error);
		}

		return false;
	}
}
