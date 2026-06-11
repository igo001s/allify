export async function sendEmail(subject: string, email: string, message: string) {
	try {
		await fetch('/api/email/send-email', {
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

		return;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error('Email error:', error instanceof Error ? error.message : String(error));
		}

		return;
	}
}
