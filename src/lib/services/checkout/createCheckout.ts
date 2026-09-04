// Svelte
import { dev } from '$app/environment';

export async function createCheckout(quantity: number, productId: string, locale: string): Promise<void> {
	try {
		const response = await fetch('/api/checkout/tickets/create-checkout', {
			method: 'POST',
			body: JSON.stringify({
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

		const checkoutUrl = parsedResponse.url;

		window.location.assign(checkoutUrl);

		return;
	} catch (error) {
		if (dev) {
			console.error('Checkout error:', error instanceof Error ? error.message : error);
		}

		return;
	}
}
