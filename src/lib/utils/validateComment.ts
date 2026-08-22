export function validateComment(comment: string): { typeError: string; error: boolean } {
	if (comment.trim().length < 1 || comment.trim().length > 200) {
		return {
			typeError: 'emptyOrTooLong',
			error: true
		};
	}

	return {
		typeError: '',
		error: false
	};
}
