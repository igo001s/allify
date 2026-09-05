// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB } from '$lib/server/mongodb';

// Environment variables
import { MONGO_DB, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';

// MongoDB
import { ObjectId } from 'mongodb';

// Stripe
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const signature = request.headers.get('stripe-signature');

		if (!signature) {
			return new Response(
				JSON.stringify({
					error: 'Missing Stripe signature'
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		const payload = await request.text();

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
		} catch (error) {
			console.error('Invalid Stripe webhook signature:', error);

			return new Response(
				JSON.stringify({
					error: 'Invalid Stripe signature'
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		if (event.type !== 'payment_intent.succeeded') {
			return new Response(JSON.stringify(true), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		const paymentIntent = event.data.object as Stripe.PaymentIntent;

		const userId = paymentIntent.metadata?.userId;
		const quantity = Number(paymentIntent.metadata?.quantity);

		if (!userId) {
			console.error('Stripe webhook: missing userId');

			return new Response(
				JSON.stringify({
					error: 'Missing userId'
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		if (!Number.isInteger(quantity) || quantity <= 0) {
			console.error('Stripe webhook: invalid quantity', {
				quantity: paymentIntent.metadata?.quantity
			});

			return new Response(
				JSON.stringify({
					error: 'Invalid quantity'
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		const client = await connectToMongoDB();

		if (!client) {
			throw new Error('Failed to connect to MongoDB');
		}

		const db = client.db(MONGO_DB);
		const users = db.collection('users');

		await users.updateOne(
			{ _id: new ObjectId(userId) },
			{
				$inc: {
					tickets: quantity
				}
			}
		);

		return new Response(JSON.stringify(true), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Stripe webhook error:', error);

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
