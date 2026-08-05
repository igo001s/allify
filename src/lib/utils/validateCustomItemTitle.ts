export function validateCustomItemTitle(title: string): { typeError: string; error: boolean } {
	if (title.trim().length < 1 || title.trim().length > 56) {
		return {
			typeError: 'emptyOrTooLong',
			error: true
		};
	}

	if (!/^[a-zA-Z0-9\s]+$/.test(title.trim())) {
		return {
			typeError: 'invalidCharacters',
			error: true
		};
	}

	return {
		typeError: '',
		error: false
	};
}
