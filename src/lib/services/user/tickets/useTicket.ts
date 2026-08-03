// Svelte
import { dev } from '$app/environment';

// Stores
import { showAddTickets } from '$lib/stores/showAddTickets.store';

export async function useTicket(email: string, tickets: number) {
	try {
		if (email && tickets <= 0) {
			showAddTickets.set(true);
			
			return false;
		}

		const response = await fetch('/api/mongodb/tickets/use-ticket', {
			method: 'POST',
			body: JSON.stringify({ email, tickets })
		});

		return response.json();
	} catch (error) {
		if (dev) {
			console.error('User useTicket error:', error);
		}

		return false;
	}
}
