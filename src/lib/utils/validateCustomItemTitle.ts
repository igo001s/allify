export function validateCustomItemTitle(
	title: string
): { error: boolean; typeError: string } | boolean {
	if (title.trim().length < 1 || title.trim().length > 56) {
		return {
			error: true,
			typeError: 'emptyOrTooLong'
		};
	}

	if (!/^[a-zA-Z0-9\s]+$/.test(title.trim())) {
		return {
			error: true,
			typeError: 'invalidCharacters'
		};
	}

	return true;
}
