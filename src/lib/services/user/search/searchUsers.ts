// Svelte
import { dev } from '$app/environment';

export async function searchUsers(user: string) {
	try {
		const response = await fetch('/api/mongodb/user/search-users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user })
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		return parsedResponse;
	} catch (error) {
		if (dev) {
			console.error('User searchUsers error:', error instanceof Error ? error.message : error);
		}

		return;
	}
}
