// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { ABACATEPAY_WEBHOOK_SECRET, ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request, url }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const webhookSecret = url.searchParams.get('webhookSecret');

	if (webhookSecret !== ABACATEPAY_WEBHOOK_SECRET) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401
		});
	}

	const rawBody = await request.text();

	let body;
	try {
		body = JSON.parse(rawBody);
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
			status: 400
		});
	}

	const email = body?.data?.customer?.email;
	const tickets = body?.data?.checkout.items[0]?.quantity;

	if (!email) {
		return new Response(JSON.stringify({ error: 'Missing email' }), {
			status: 400
		});
	}

	await fetch(`${url.origin}/api/mongodb/tickets/add-ticket`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
			tickets
		})
	});

	return new Response(JSON.stringify({ success: true }), {
		status: 200
	});
};
