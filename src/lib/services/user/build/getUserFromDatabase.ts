// Svelte
import { dev } from '$app/environment';

export async function getUserFromDatabase(email: string) {
	try {
		if (!email) {
			return undefined;
		}
		
		const response = await fetch('/api/mongodb/user/get-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		return parsedResponse;
	} catch (error) {
		if (dev) {
			console.error(
				'User getUserFromDatabase error:',
				error instanceof Error ? error.message : error
			);
		}

		return undefined;
	}
}
