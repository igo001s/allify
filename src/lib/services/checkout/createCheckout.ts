// Svelte
import { dev } from '$app/environment';

// MongoDb
import type { ObjectId } from 'mongodb';

export async function createCheckout(
	quantity: number,
	productId: string,
	locale: string,
	userId?: ObjectId
) {
	try {
		if (!userId || quantity < 5) return;

		const response = await fetch('/api/checkout/tickets/create-checkout', {
			method: 'POST',
			body: JSON.stringify({
				userId,
				items: [
					{
						id: productId,
						quantity
					}
				],
				externalId: `allify_order_${crypto.randomUUID()}`,
				returnUrl: window.location.href,
				locale,
				completionUrl: `/payment-success?quantity=${quantity}`,
				methods: ['PIX', 'CARD'],
				card: {
					maxInstallments: 1
				},
				metadata: {
					origem: 'app-mobile'
				}
			})
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		if (!parsedResponse.url) {
			throw new Error('Checkout URL not found');
		}

		const checkoutUrl = new URL(parsedResponse.url);

		if (checkoutUrl.protocol !== 'https:') {
			throw new Error('Invalid checkout URL');
		}

		if (checkoutUrl.hostname !== 'checkout.stripe.com') {
			throw new Error('Invalid checkout domain');
		}

		window.location.assign(checkoutUrl.href);

		return;
	} catch (error) {
		if (dev) {
			console.error('Checkout error:', error instanceof Error ? error.message : error);
		}

		return {
			error: true,
			errorType: 'checkoutError'
		};
	}
}
