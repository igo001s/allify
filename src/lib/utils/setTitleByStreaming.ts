// Svelte
import { get } from 'svelte/store';

// Stores
import { translationsStore } from '$lib/stores/translations.store';

export function setTitleByStreaming(streaming: string) {
	let message = get(translationsStore);

	return message.generalTexts.loginWith + streaming.charAt(0).toUpperCase() + streaming.slice(1);
}
