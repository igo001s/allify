// Svelte
import { dev } from '$app/environment';

// Types
import type { AuthorComment } from '$lib/types/Comments.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function addCommentOnPublicProfile(
	authorComment: AuthorComment,
	commentRecipientUserId: ObjectId,
	commentText: string
) {
	try {
		if (!authorComment || !commentRecipientUserId || !commentText) return;

		const addCommentOnPublicProfileResponse = await fetch(
			'/api/mongodb/add/add-comment-on-public-profile',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					authorComment,
					commentRecipientUserId,
					commentText
				})
			}
		);

		if (!addCommentOnPublicProfileResponse.ok) {
			const error = await addCommentOnPublicProfileResponse.json();
			throw new Error(error.error);
		}

		const parsedAddCommentOnPublicProfile = await addCommentOnPublicProfileResponse.json();

		return parsedAddCommentOnPublicProfile;
	} catch (error) {
		if (dev) {
			console.error('User addCommentOnPublicProfile error:', error);
		}

		return null;
	}
}
