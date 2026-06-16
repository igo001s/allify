// Svelte
import { writable, type Writable } from 'svelte/store';

// Environment
import { browser } from '$app/environment';

const storedLoading = browser
	? sessionStorage.getItem('allify-loading-spotify') ||
		sessionStorage.getItem('allify-loading-deezer')
	: null;

const initialState = storedLoading
	? JSON.parse(storedLoading)
	: {
			loading: false,
			streamingPlatform: null
	  };

export const loadingAfterConnectionStore: Writable<{
	loading: boolean;
	streamingPlatform: 'spotify' | 'deezer' | null;
}> = writable(initialState);
