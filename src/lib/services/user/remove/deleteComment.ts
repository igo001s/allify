// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { CommentReceived } from '$lib/types/Comments.type';

export async function deleteComment(
	userId: ObjectId,
	authorId: ObjectId,
	comments: CommentReceived[]
) {
	try {
		if (!userId || !authorId) return;

		const filteredComments = comments.filter(
			(comment) => comment.author._id.toString() !== authorId.toString()
		);

		const response = await fetch('/api/mongodb/remove/delete-comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId,
				filteredComments
			})
		});

		if (!response.ok) {
			const { error } = await response.json();
			throw new Error(error);
		}

		const parsedResponse = await response.json();

		return parsedResponse;
	} catch (error) {
		if (dev) {
			console.error('User deleteComment error:', error instanceof Error ? error.message : error);
		}

		return {
			error: true,
			errorType: 'deleteCommentError'
		};
	}
}
