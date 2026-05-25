export async function logoutSpotify() {
	await fetch('/api/logout', {
		method: 'POST',
		credentials: 'include'
	});
}
