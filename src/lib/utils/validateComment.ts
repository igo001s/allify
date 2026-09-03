export function validateComment(comment: string): { error: boolean; typeError: string } | boolean {
	if (comment.trim().length < 1 || comment.trim().length > 200) {
		return {
			error: true,
			typeError: 'emptyOrTooLong'
		};
	}

	return true;
}
