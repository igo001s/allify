// Svelte
import { writable, type Writable } from 'svelte/store';

export const toastStore: Writable<{
	showToast: boolean;
	toastType: string | undefined;
	toastMessage: string | undefined;
}> = writable({ showToast: false, toastType: undefined, toastMessage: undefined });
