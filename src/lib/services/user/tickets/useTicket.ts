// Svelte
import { dev } from '$app/environment';

// Stores
import { showAddTickets } from '$lib/stores/showAddTickets.store';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function useTicket(id: ObjectId, tickets: number) {
	try {
		if (id && tickets <= 0) {
			showAddTickets.set(true);

			return false;
		}

		const response = await fetch('/api/mongodb/tickets/use-ticket', {
			method: 'POST',
			body: JSON.stringify({ id, tickets })
		});

		return response.json();
	} catch (error) {
		if (dev) {
			console.error('User useTicket error:', error);
		}

		return false;
	}
}
