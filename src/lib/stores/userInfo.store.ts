// Svelte
import { writable, type Writable } from 'svelte/store';

// Types
import type { UserInfo } from '#lib/types/UserInfo.type';

export const userInfo: Writable<UserInfo | undefined> = writable(undefined);
