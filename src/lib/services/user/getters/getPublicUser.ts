export async function getPublicUser(id: string) {
	try {
		const response = await fetch('/api/mongodb/user/get-public-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});

		const data = await response.json();

		return data.userFoundedById;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'User getPublicUser error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return;
	}
}