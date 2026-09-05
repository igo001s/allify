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
				completionUrl: '/payment-success',
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

		window.location.assign(parsedResponse.url);

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
