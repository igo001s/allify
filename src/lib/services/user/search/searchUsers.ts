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
		if (import.meta.env.DEV) {
			console.error(
				'User getFreeDiscoveries error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return;
	}
}
