// Svelte
import { dev } from '$app/environment';

export async function getUserFromDatabase(email: string) {
	try {
		const getUserRequest = await fetch('/api/mongodb/user/get-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		return await getUserRequest.json();
	} catch (error) {
		if (dev) {
			console.error('User getUserFromDatabase error:', error);
		}

		return;
	}
}
