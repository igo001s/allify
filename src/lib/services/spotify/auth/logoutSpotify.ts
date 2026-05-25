export async function logoutSpotify() {
	try {
		await fetch('/api/spotify/auth/logout', {
			method: 'POST',
			credentials: 'include'
		});

		return;
	} catch (error) {
		console.error(
			error instanceof Error ? error.message : 'An error occurred while logging out from Spotify'
		);

		return;
	}
}
