export function signInSpotify() {
	try {
		window.location.href = `/api/spotify/auth/login`;

		return;
	} catch (error) {
		console.error(error instanceof Error ? error.message : 'An error occurred during Spotify sign-in');

		return;
	}
}
