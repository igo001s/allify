// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function addCommentOnPublicProfile(
	commenter: {
		image?: {
			url: string;
			height: number | null;
			width: number | null;
		};
		_id: ObjectId;
		name: string;
	},
	commentRecipientUserId: ObjectId,
	commentText: string
) {
	try {
		if (!commenter || !commentRecipientUserId || !commentText) return;

		const addCommentOnPublicProfileResponse = await fetch(
			'/api/mongodb/add/add-comment-on-public-profile',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					commenter,
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
