export async function getUserFromDatabase(email: string) {
	try {
		const getUserRequest = await fetch('/api/mongodb/get-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		return await getUserRequest.json();
	} catch (error) {
		throw new Error('Error fetching user');
	}
}
