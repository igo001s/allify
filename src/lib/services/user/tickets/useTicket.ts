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
			showAddTickets.set(true);

			return false;
		}

		const useTicketResponse = await fetch('/api/mongodb/tickets/use-ticket', {
			method: 'POST',
			body: JSON.stringify({ id, tickets })
		});

		if (!useTicketResponse.ok) {
			throw new Error('Failed to use ticket');
		}

		const parsedUseTicket = await useTicketResponse.json();
		
		userInfo.update((currentUser) => {
			if (currentUser) {
				currentUser.tickets = parsedUseTicket.tickets;
			}
						
			return currentUser;
		});

		return true;
	} catch (error) {
		if (dev) {
			console.error('User useTicket error:', error);
		}

		return false;
	}
}
