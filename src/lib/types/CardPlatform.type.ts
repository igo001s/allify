// Svelte
import type { SvelteComponent } from 'svelte';

export type CardPlatformType = {
	icon: typeof SvelteComponent;
	title: string;
	description: string;
	link: string;
};
