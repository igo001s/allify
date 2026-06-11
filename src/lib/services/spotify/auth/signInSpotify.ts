export function signInSpotify() {
	try {
		window.location.href = `/api/spotify/auth/login`;

		return;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'Spotify sign-in error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return;
	}
}
