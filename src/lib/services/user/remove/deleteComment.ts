// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { Comment } from '$lib/types/Comments.type';

export async function deleteComment(userId: ObjectId, authorId: ObjectId, comments: Comment[]) {
	try {
		if (!userId || !authorId) return;

		const filteredComments = comments.filter(
			(comment) => comment.author._id.toString() !== authorId.toString()
		);

		const deleteCommentResponse = await fetch('/api/mongodb/remove/delete-comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId,
				filteredComments
			})
		});

		if (!deleteCommentResponse.ok) {
			const error = await deleteCommentResponse.json();
			throw new Error(error.error);
		}

		const parsedDeleteComment = await deleteCommentResponse.json();

		return parsedDeleteComment;
	} catch (error) {
		if (dev) {
			console.error('User deleteComment error:', error);
		}

		return null;
	}
}
