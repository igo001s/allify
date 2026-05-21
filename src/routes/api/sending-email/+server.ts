// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { ALLIFY_URL, ALLIFY_RESEND_KEY } from '$env/static/private';

// Libraries
import { Resend } from 'resend';

const ALLOWED_ORIGINS = [ALLIFY_URL];

const resend = new Resend(ALLIFY_RESEND_KEY);

export const POST: RequestHandler = async ({ request }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { emailTo, subject, message } = await request.json();

	if (!emailTo || !subject || !message) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
	}

	const { error } = await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		to: emailTo,
		subject: subject,
		html: `${message}`
	});

	if (error) {
		return new Response(JSON.stringify({ error }), { status: 500 });
	}

	return new Response(JSON.stringify({ success: true }), { status: 200 });
};
