export async function removeFromFavorites(emailFromRemove: string, email: string) {
	try {
		if (!emailFromRemove || !email) return;

		const response = await fetch('/api/mongodb/updates/remove-from-favorites', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				emailFromRemove,
				email
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'User removeFromFavorites error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return null;
	}
}
