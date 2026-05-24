export async function sendEmail(subject: string, email: string, message: string) {
	try {
		await fetch('/api/send-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				subject: subject,
				email: email,
				message: message
			})
		});
	} catch (error) {
		console.error(
			error instanceof Error ? error.message : 'An error occurred while sending the email'
		);

		return;
	}
}
