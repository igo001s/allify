// Svelte
import { dev } from '$app/environment';

export async function sendEmail(subject: string, email: string, message: string) {
	try {
		const response = await fetch('/api/email/send-email', {
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

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		return;
	} catch (error) {
		if (dev) {
			console.error('Email error:', error instanceof Error ? error.message : error);
		}

		return;
	}
}
