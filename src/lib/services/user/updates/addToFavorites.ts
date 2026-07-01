export async function addToFavorites(
	emailToSave: string,
	email: string,
	name: string,
	image: {
		url: string;
		height: number | null;
		width: number | null;
	},
	spotifyConnected?: boolean,
	deezerConnected?: boolean
) {
	try {
		if (!emailToSave || !email || !name || !image) return;

		const response = await fetch('/api/mongodb/updates/add-to-favorites', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				emailToSave,
				email,
				name,
				image,
				spotifyConnected,
				deezerConnected
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		return response;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'User addToFavorites error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return null;
	}
}
