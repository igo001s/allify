// Svelte
import { dev } from '$app/environment';

export async function getUserFromDatabase(email: string) {
	try {
		const getUserResponse = await fetch('/api/mongodb/user/get-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		if (!getUserResponse.ok) {
			const error = await getUserResponse.json();
			throw new Error(error.error);
		}

		const parsedGetUser = await getUserResponse.json();

		return parsedGetUser;
	} catch (error) {
		if (dev) {
			console.error('User getUserFromDatabase error:', error);
		}

		return;
	}
}
