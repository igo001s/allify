// Svelte
import { dev } from '$app/environment';

export async function useTicket(email: string, tickets: number) {
	try {
		const response = await fetch('/api/mongodb/tickets/use-ticket', {
			method: 'POST',
			body: JSON.stringify({ email, tickets })
		});

		return response.json();
	} catch (error) {
		if (dev) {
			console.error('User useTicket error:', error);
		}

		return;
	}
}
