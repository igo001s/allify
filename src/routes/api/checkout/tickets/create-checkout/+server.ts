// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { ABACATEPAY_TOKEN, ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request }) => {
	try {
		const origin = request.headers.get('origin');

		if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
			return new Response(JSON.stringify({ error: 'Forbidden' }), {
				status: 403
			});
		}

		const body = await request.json();

		if (!body || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const response = await fetch('https://api.abacatepay.com/v2/checkouts/create', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ABACATEPAY_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		const data = await response.json();

		if (!response.ok) {
			return new Response(JSON.stringify({ error: data?.error ?? 'AbacatePay error' }), {
				status: response.status
			});
		}

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), {
			status: 500
		});
	}
};
