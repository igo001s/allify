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

		const data = await response.json();

		return data.users;
	} catch (error) {
		if (dev) {
			console.error(
				'User searchUsers error:',
				error
			);
		}

		return;
	}
}
