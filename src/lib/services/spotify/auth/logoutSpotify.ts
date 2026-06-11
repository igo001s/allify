export async function logoutSpotify() {
	try {
		await fetch('/api/spotify/auth/logout', {
			method: 'POST',
			credentials: 'include'
		});

		return;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'Spotify logout error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return;
	}
}
