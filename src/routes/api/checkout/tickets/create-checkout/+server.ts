// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { STRIPE_SECRET_KEY, ALLIFY_URL } from '$env/static/private';

// Stripe
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY);

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request }) => {
	try {
		const origin = request.headers.get('origin');

		if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
			return new Response(JSON.stringify({ error: 'Forbidden' }), {
				status: 403,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		const { items, externalId, returnUrl, completionUrl, metadata, locale, userId } =
			await request.json();

		if (!items || !externalId || !returnUrl || !completionUrl || !metadata || !userId) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		const product = await stripe.products.retrieve(items[0].id);

		if (!product.default_price) {
			throw new Error('Product does not have a default price');
		}

		const priceId =
			typeof product.default_price === 'string' ? product.default_price : product.default_price.id;

		const session = await stripe.checkout.sessions.create({
			client_reference_id: userId,
			line_items: [
				{
					price: priceId,
					quantity: items[0].quantity ?? 1
				}
			],
			locale,
			mode: 'payment',
			success_url: ALLIFY_URL + completionUrl,
			cancel_url: returnUrl,
			metadata: {
				externalId,
				...metadata
			},
			payment_intent_data: {
				metadata: {
					userId,
					externalId,
					quantity: String(items[0].quantity),
					...metadata
				}
			}
		});

		return new Response(
			JSON.stringify({
				id: session.id,
				url: session.url
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: error instanceof Error ? error.message : 'Unknown error'
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
};
