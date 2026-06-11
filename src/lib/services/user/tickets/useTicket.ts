export async function useTicket(email: string, tickets: number) {
	try {
		const response = await fetch('/api/mongodb/tickets/use-ticket', {
			method: 'POST',
			body: JSON.stringify({ email, tickets })
		});

		return response.json();
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'User useTicket error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return;
	}
}
