// Svelte
import { dev } from '$app/environment';

// Types
import type { AuthorComment } from '$lib/types/Comments.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function addCommentOnPublicProfile(
	authorComment: AuthorComment,
	commentRecipientUserId: ObjectId,
	commentedUserIds: ObjectId[],
	commentText: string
) {
	try {
		if (!authorComment || !commentRecipientUserId || !commentText) return;

		if (commentedUserIds.some((id) => id === commentRecipientUserId)) {
			return {
				error: true,
				typeError: 'alreadyCommented'
			};
		}

		const response = await fetch('/api/mongodb/add/add-comment-on-public-profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				authorComment,
				commentRecipientUserId,
				commentedUserIds,
				commentText
			})
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error);
		}

		const parsedResponse = await response.json();

		return parsedResponse;
	} catch (error) {
		if (dev) {
			console.error('User addCommentOnPublicProfile error:', error);
		}

		return {
			error: true,
			typeError: 'addCommentOnPublicProfile'
		};
	}
}
