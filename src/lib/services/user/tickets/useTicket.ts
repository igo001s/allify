// Svelte
import { dev } from '$app/environment';

// Stores
import { showAddTickets } from '$lib/stores/showAddTickets.store';
import { userInfo } from '$lib/stores/userInfo.store';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function useTicket(id: ObjectId, tickets: number) {
	try {
		if (id && tickets <= 0) {
			showAddTickets.set({ show: true, openFrom: 'noTickets' });

			return false;
		}

		const response = await fetch('/api/mongodb/tickets/use-ticket', {
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
			console.error('User useTicket error:', error instanceof Error ? error.message : error);
		}

		return false;
	}
}
