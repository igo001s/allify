// Svelte
import { dev } from '$app/environment';

export async function getPublicUser(id: string) {
	try {
		const getPublicUserResponse = await fetch('/api/mongodb/user/get-public-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});

		const parsedGetPublicUser = await getPublicUserResponse.json();

		return parsedGetPublicUser.userFoundedById;
	} catch (error) {
		if (dev) {
			console.error('User getPublicUser error:', error);
		}

		return;
	}
}
