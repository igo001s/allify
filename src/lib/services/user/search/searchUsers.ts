// Svelte
import { dev } from '$app/environment';

export async function searchUsers(user: string) {
	try {
		const searchUsersResponse = await fetch('/api/mongodb/user/search-users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user })
		});

		const parsedSearchUsers = await searchUsersResponse.json();

		return parsedSearchUsers.users;
	} catch (error) {
		if (dev) {
			console.error('User searchUsers error:', error);
		}

		return;
	}
}
