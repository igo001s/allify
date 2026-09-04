// Svelte
import { writable, type Writable } from 'svelte/store';

export const showAddTickets: Writable<{show: boolean; openFrom: 'noTickets' | 'profilePage' }> = writable({ show: false, openFrom: 'noTickets' });
