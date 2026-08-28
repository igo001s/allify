// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectToMongoDB } from '$lib/server/mongodb';

// Types
import type { UserInfo } from '$lib/types/UserInfo.type';

// MongoDB
import { ObjectId } from 'mongodb';

// Environment variables
import { MONGO_DB, ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403
		});
	}

	try {
		const { authorComment, commentRecipientUserId, commentText } = await request.json();

		if (!authorComment || !commentRecipientUserId || !commentText) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400
			});
		}

		const client = await connectToMongoDB();
		const db = client?.db(MONGO_DB);
		const users = db?.collection<UserInfo>('users');

		const updateCommentsMadeOnRecipientProfile = await users?.updateOne(
			{ _id: new ObjectId(commentRecipientUserId) },
			{
				$push: {
					'comments.commentsMadeOnMyProfile': {
						author: authorComment,
						content: commentText,
						createdAt: new Date()
					}
				}
			}
		);

		const updateCommentsMadeByMe = await users?.updateOne(
			{ _id: new ObjectId(authorComment._id) },
			{
				$push: {
					'comments.commentsMadeByMe': {
						recipient: commentRecipientUserId,
						content: commentText,
						createdAt: new Date()
					}
				}
			}
		);

		if (updateCommentsMadeOnRecipientProfile?.matchedCount === 0) {
			return new Response(JSON.stringify({ error: 'Recipient not found' }), {
				status: 404
			});
		}

		if (updateCommentsMadeByMe?.matchedCount === 0) {
			return new Response(JSON.stringify({ error: 'Author not found' }), {
				status: 404
			});
		}

		return new Response(
			JSON.stringify({
				recipient: commentRecipientUserId,
				content: commentText,
				createdAt: new Date()
			}),
			{
				status: 200
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error
			}),
			{
				status: 500
			}
		);
	}
};
