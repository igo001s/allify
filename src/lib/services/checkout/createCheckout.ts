export async function createCheckout(quantity: number): Promise<void> {
	if (quantity <= 0) {
		console.error('Invalid quantity');
		return;
	}

	try {
		const response = await fetch('/api/checkout/tickets/create-checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
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

		if (!response.ok) {
			throw new Error(data.error || `HTTP error ${response.status}`);
		}

		const checkoutUrl = data.data?.url;

		if (!checkoutUrl) {
			throw new Error('Checkout URL not found');
		}

		window.location.assign(checkoutUrl);
	} catch (error) {
		console.error(error instanceof Error ? error.message : 'An error occurred during checkout');

		return;
	}
}
