export async function createCheckout(quantity: number): Promise<void> {
	try {
		const response = await fetch('/api/checkout/tickets/create-checkout', {
			method: 'POST',
			body: JSON.stringify({
				items: [
					{
						id: 'prod_ypRnMCbTwsXBKRfZgF4xrQXK',
						quantity
					}
				],
				externalId: `allify_order_${crypto.randomUUID()}`,
				returnUrl: window.location.href,
				completionUrl: window.location.href,
				methods: ['PIX', 'CARD'],
				metadata: {
					origem: 'app-mobile'
				}
			})
		});

		const data = await response.json();

		const checkoutUrl = data.data?.url;

		if (!checkoutUrl) {
			throw new Error('Checkout URL not found');
		}

		window.location.assign(checkoutUrl);

		return;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error('Checkout error:', error instanceof Error ? error.message : String(error));
		}

		return;
	}
}
