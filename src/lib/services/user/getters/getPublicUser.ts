// Svelte
import { dev } from '$app/environment';

export async function getPublicUser(id: string) {
	try {
		if (!id) return;

		const response = await fetch('/api/mongodb/user/get-public-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		return parsedResponse;
	} catch (error) {
		if (dev) {
			console.error('User getPublicUser error:', error instanceof Error ? error.message : error);
		}

		return;
	}
}
