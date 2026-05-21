// Svelte
import { browser } from '$app/environment';

// Stores
import { writable } from 'svelte/store';

export const languageStore = writable<string>('en-US');

if (browser) {
	const saved = localStorage.getItem('allify-language');

	if (saved) {
		languageStore.set(saved);
	} else {
		localStorage.setItem('allify-language', navigator.language);
		languageStore.set(navigator.language);
	}
}
