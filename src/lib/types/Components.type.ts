// Svelte
import type { SvelteComponent } from 'svelte';

export type CardPlatformType = {
	icon: typeof SvelteComponent;
	title: string;
	description: string;
	link: string;
};

export type FooterColumnItems = {
	title: string;
	items: { text: string; href: string }[] | { image: unknown; href: string; altText: string }[];
};
